import { useLayoutEffect, useRef, useState } from 'react';

const HANGUL_POOL =
  '가각간갈감갑강개객거건걸검게겨격견결경계고곡공과관광교구국군굴궁권귀규균그극근글금급기긴길김나다라마바사아자차카타파하';
const LATIN_POOL = 'ABCDEFGHJKLMNPRSTUVWXYZabcdefghkmnopqrstuvwxyz';

const isHangul = (c: string) => /[가-힣]/.test(c);
const isLatin = (c: string) => /[A-Za-z]/.test(c);
const isFixed = (c: string) => !isHangul(c) && !isLatin(c);

function randomFor(c: string) {
  const pool = isHangul(c) ? HANGUL_POOL : LATIN_POOL;
  return pool[(Math.random() * pool.length) | 0];
}

function scrambleAll(lines: readonly string[]) {
  return lines.map((l) => l.replace(/./g, (c) => (isFixed(c) ? c : randomFor(c))));
}

/**
 * 텍스트 스크램블 리빌 — 글자 수·자리는 처음부터 그대로 두고(레이아웃 고정),
 * 무작위 글자가 앞에서부터 원래 글자로 맞춰집니다(약 0.9초).
 * `run`이 처음 true가 될 때 한 번만 재생하고, 모션 감소 설정이면 바로 원문을 보여 줍니다.
 */
export function useScramble(lines: readonly string[], run: boolean): string[] {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const played = useRef(false);
  const [display, setDisplay] = useState<string[]>(() =>
    run && !reduce ? scrambleAll(lines) : [...lines],
  );

  useLayoutEffect(() => {
    if (!run || played.current) return undefined;
    played.current = true;
    if (reduce) {
      setDisplay([...lines]);
      return undefined;
    }

    let order = 0;
    const at = lines.map((l) =>
      l.split('').map((c) => (isFixed(c) ? 0 : order++ * 12 + Math.random() * 220 + 120)),
    );
    const t0 = performance.now();
    let last = 0;
    let raf = 0;
    let finished = false;
    setDisplay(scrambleAll(lines));

    const tick = (now: number) => {
      const t = now - t0;
      if (now - last < 45) {
        raf = requestAnimationFrame(tick);
        return;
      }
      last = now;
      let done = true;
      const next = lines.map((l, li) =>
        l
          .split('')
          .map((c, ci) => {
            if (t >= at[li][ci]) return c;
            done = false;
            return randomFor(c);
          })
          .join(''),
      );
      setDisplay(next);
      if (done) finished = true;
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (!finished) {
        // 중간에 끊기면(StrictMode 재실행·섹션 이탈) 원문으로 두고 다음 기회에 다시 재생합니다.
        played.current = false;
        setDisplay([...lines]);
      }
    };
    // lines는 정적 데이터입니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, reduce]);

  return display;
}
