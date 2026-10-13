import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { search } from './fuzzy';
import {
  Backdrop,
  Dialog,
  Empty,
  Foot,
  GroupLabel,
  InputRow,
  Item,
  List,
  Toast,
} from './commandPalette.styles';

export type PaletteItem = {
  id: string;
  group: string;
  title: string;
  sub: string;
  icon: string;
  hint: string;
  kw: string;
  /** 실행 — 문자열을 돌려주면 토스트로 보여 줍니다. */
  run: () => void | string | Promise<void | string>;
};

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaletteItem[];
};

export const IS_MAC =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
export const MOD_KEY = IS_MAC ? '⌘' : 'Ctrl';

/** ⌘K / Ctrl+K 명령 팔레트 — 프로젝트·섹션으로 바로 이동합니다. 초성 검색을 지원합니다. */
export default function CommandPalette({ open, onOpenChange, items }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const results = useMemo(() => search(items, query), [items, query]);
  const safeSel = Math.min(sel, Math.max(0, results.length - 1));

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // 전역 단축키: ⌘K / Ctrl+K 토글, Esc 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.code === 'KeyK')) {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange, close]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setSel(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    lastFocus.current?.focus?.({ preventScroll: true });
    return undefined;
  }, [open]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${safeSel}"]`)
      ?.scrollIntoView?.({ block: 'nearest' });
  }, [safeSel, open]);

  const showToast = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const choose = (i: number) => {
    const r = results[i];
    if (!r) return;
    close();
    // 팔레트가 닫힌 뒤(포커스 복귀 후) 이동해야 스크롤이 튀지 않습니다.
    setTimeout(async () => {
      const msg = await r.item.run();
      if (typeof msg === 'string') showToast(msg);
    }, 60);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length) setSel((safeSel + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length) setSel((safeSel - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(safeSel);
    } else if (e.key === 'Tab') {
      // 다이얼로그 안에 포커스를 가둡니다(입력창 하나뿐).
      e.preventDefault();
    }
  };

  let lastGroup = '';

  return (
    <>
      {open && (
        <Backdrop
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <Dialog role="dialog" aria-modal="true" aria-label="명령 팔레트">
            <InputRow>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <circle cx="9" cy="9" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="프로젝트, 기술, 초성으로 찾아보세요 (예: ㅂㅂㅅ, vue)"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results.length ? `palette-opt-${safeSel}` : undefined}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onInputKey}
              />
              <button type="button" className="esc" onClick={close} aria-label="팔레트 닫기">
                <kbd>esc</kbd>
              </button>
            </InputRow>
            <List id="palette-list" role="listbox" ref={listRef}>
              {results.length === 0 && (
                <Empty>
                  “{query}”에 맞는 항목이 없어요. 초성(ㅂㅂㅅ)이나 기술명(vue)으로 찾아보세요.
                </Empty>
              )}
              {results.map((r, i) => {
                const showGroup = !query && r.item.group !== lastGroup;
                lastGroup = r.item.group;
                const title = r.item.title
                  .split('')
                  .map((c, ci) => (r.idx.includes(ci) ? <mark key={ci}>{c}</mark> : c));
                return (
                  <div key={r.item.id} role="presentation">
                    {showGroup && <GroupLabel role="presentation">{r.item.group}</GroupLabel>}
                    <Item
                      id={`palette-opt-${i}`}
                      role="option"
                      aria-selected={i === safeSel}
                      data-index={i}
                      $on={i === safeSel}
                      onPointerMove={() => i !== safeSel && setSel(i)}
                      onClick={() => choose(i)}
                    >
                      <span className="pi" aria-hidden>
                        {r.item.icon}
                      </span>
                      <span className="pt">
                        <b>{title}</b>
                        <small>{r.item.sub}</small>
                      </span>
                      <span className="pk">{r.item.hint}</span>
                    </Item>
                  </div>
                );
              })}
            </List>
            <Foot>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> 이동
              </span>
              <span>
                <kbd>↵</kbd> 열기
              </span>
              <span>
                <kbd>esc</kbd> 닫기
              </span>
              <span className="push">초성 검색도 돼요</span>
            </Foot>
          </Dialog>
        </Backdrop>
      )}
      <Toast role="status" aria-live="polite" $show={!!toast}>
        {toast}
      </Toast>
    </>
  );
}
