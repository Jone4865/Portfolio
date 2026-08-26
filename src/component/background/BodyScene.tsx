import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

const HELMET_PATH = '/models/DamagedHelmet.glb';

function HelmetModel() {
  const { scene } = useGLTF(HELMET_PATH);
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={group} position={[0, 0.15, 0]} scale={1.35}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.6} color="#ffffff" />
      <spotLight
        position={[-2, 3, 2]}
        intensity={1.1}
        angle={0.55}
        penumbra={0.6}
        color={accent}
      />
      <HelmetModel />
      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.45}
        scale={6}
        blur={2.2}
        far={3}
        color="#1a1216"
      />
      <Environment preset="city" />
    </>
  );
}

useGLTF.preload(HELMET_PATH);

type Props = {
  enabled?: boolean;
  accent?: string;
};

/**
 * body 여백(우하단)용 고퀄 PBR 모델.
 * Polyfork 저폴리곤이 아니라 Khronos DamagedHelmet(텍스처·메탈릭 포함) 사용.
 */
export default function BodyScene({ enabled = true, accent = '#fb7185' }: Props) {
  if (!enabled) return null;

  return (
    <CanvasHost aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0.4, 0.35, 3.2], fov: 35, near: 0.1, far: 40 }}
      >
        <Suspense fallback={null}>
          <SceneContent accent={accent} />
        </Suspense>
      </Canvas>
    </CanvasHost>
  );
}

const CanvasHost = styled.div`
  position: fixed;
  right: clamp(8px, 2vw, 28px);
  bottom: clamp(8px, 2vh, 24px);
  width: min(42vw, 520px);
  height: min(48vh, 460px);
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;
