import { useEffect, useState } from 'react';

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * window load → 첫 페인트(double rAF) → delay → 브라우저 idle 순서로 기다린 뒤 true가 됩니다.
 * 무거운 3D 청크(three/@react-three)를 히어로 카드·텍스트 등장 애니메이션(~1s)이 끝난 뒤 받기 위해 사용합니다.
 */
export function useIdleReady(enabled = true, { delay = 1000, timeout = 2000 } = {}): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;
    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;

    const afterPaint = () => {
      timerId = setTimeout(() => {
        if (w.requestIdleCallback) {
          idleId = w.requestIdleCallback(() => setReady(true), { timeout });
        } else {
          setReady(true);
        }
      }, delay);
    };

    const schedule = () => {
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(afterPaint);
      });
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      if (timerId !== undefined) clearTimeout(timerId);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
    };
  }, [enabled, ready, delay, timeout]);

  return ready;
}
