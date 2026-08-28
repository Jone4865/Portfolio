import styled from 'styled-components';

import { BODY_SCENE_OPACITY } from 'constants/three/bodyScene';

export const CanvasHost = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: ${BODY_SCENE_OPACITY};
  filter: saturate(0.85) blur(0.2px);
`;
