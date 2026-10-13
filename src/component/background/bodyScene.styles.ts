import styled, { keyframes } from 'styled-components';

import { BODY_SCENE_OPACITY } from 'constants/three/bodyScene';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: ${BODY_SCENE_OPACITY}; }
`;

export const CanvasHost = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: ${BODY_SCENE_OPACITY};
  filter: saturate(0.85) blur(0.2px);
  animation: ${fadeIn} 0.8s ease-out both;
`;
