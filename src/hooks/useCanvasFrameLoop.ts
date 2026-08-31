import { type RefObject, useEffect, useState } from 'react';

type FrameLoop = 'always' | 'never';

export function useCanvasFrameLoop(
  hostRef: RefObject<HTMLElement | null>,
  enabled = true,
): FrameLoop {
  const [intersecting, setIntersecting] = useState(true);
  const [docVisible, setDocVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => setDocVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [enabled]);

  useEffect(() => {
    const node = hostRef.current;
    if (!enabled || !node) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, hostRef]);

  return enabled && intersecting && docVisible ? 'always' : 'never';
}
