import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import { HERO_WIRE_CAMERA } from 'constants/three/heroWireframe';
import type { HeroWireframeProps } from 'types/components/heroWireframe';

import HeroWireScene from './HeroWireScene';
import { WireHost } from './heroWireframe.styles';

/** 히어로 카드 안 — 회색 wireframe */
export default function HeroWireframe({ enabled = true }: HeroWireframeProps) {
  if (!enabled) return null;

  return (
    <WireHost aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{
          position: HERO_WIRE_CAMERA.position,
          fov: HERO_WIRE_CAMERA.fov,
        }}
      >
        <Suspense fallback={null}>
          <HeroWireScene />
        </Suspense>
      </Canvas>
    </WireHost>
  );
}
