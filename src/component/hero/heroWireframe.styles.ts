import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const WireHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  animation: ${fadeIn} 0.6s ease-out both;
`;
