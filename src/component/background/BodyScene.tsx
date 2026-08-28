import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { BODY_CAMERA } from 'constants/three/bodyScene';
import type { BodySceneProps } from 'types/components/bodyScene';

import { CanvasHost } from './bodyScene.styles';
import SceneContent from './SceneContent';

/** body 뒤 배경 — FE 포트폴리오 톤에 맞는 MacBook */
export default function BodyScene({ enabled = true, accent = '#b83253' }: BodySceneProps) {
  if (!enabled) return null;

  return (
    <CanvasHost aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          position: BODY_CAMERA.position,
          fov: BODY_CAMERA.fov,
          near: BODY_CAMERA.near,
          far: BODY_CAMERA.far,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent accent={accent} />
        </Suspense>
      </Canvas>
    </CanvasHost>
  );
}
