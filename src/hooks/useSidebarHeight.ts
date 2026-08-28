import { useEffect, useState } from 'react';

export function useSidebarHeight(isMobile: boolean) {
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => {
    const measureSidebarHeight = () => {
      if (isMobile) {
        const siderElement = document.querySelector('[data-sider]') as HTMLElement;
        if (siderElement) {
          setSidebarHeight(siderElement.scrollHeight);
        }
      }
    };

    measureSidebarHeight();
    window.addEventListener('resize', measureSidebarHeight);

    return () => {
      window.removeEventListener('resize', measureSidebarHeight);
    };
  }, [isMobile]);

  return sidebarHeight;
}
