// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

if (typeof globalThis.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number;
    readonly pointerType: string;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? 'mouse';
    }
  }

  globalThis.PointerEvent = PointerEventPolyfill as typeof PointerEvent;
}

jest.mock('react-typical', () => {
  const mockReact = require('react');
  return function MockTypical() {
    return mockReact.createElement(
      'span',
      { 'data-testid': 'hero-typing' },
      'Developer 채종원의 포트폴리오입니다.',
    );
  };
});

jest.mock('hooks', () => {
  const actual = jest.requireActual('hooks');
  return {
    ...actual,
    useResponsive: () => ({
      isDesktop: false,
      isTablet: false,
      isMobile: true,
    }),
    useSidebarHeight: () => 800,
  };
});
