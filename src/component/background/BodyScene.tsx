import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

/** CC-BY-4.0 — jackbaeten MacBook Pro M3 (via wistant/landing-macbook) */
const MACBOOK_PATH = '/models/macbook.glb';

function MacbookModel() {
  const { scene } = useGLTF(MACBOOK_PATH);
  const group = useRef<THREE.Group>(null);

  const prepared = useMemo(() => {
    const next = scene.clone(true);
    next.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && 'roughness' in mat) {
        mat.envMapIntensity = 0.85;
      }
    });
    return next;
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.35 + Math.sin(t * 0.18) * 0.08;
    group.current.rotation.x = 0.12 + Math.cos(t * 0.14) * 0.03;
  });

  return (
    <Float speed={0.95} rotationIntensity={0.12} floatIntensity={0.22}>
      <group ref={group} position={[1.35, -0.15, 0]} scale={0.085}>
        <Center>
          <primitive object={prepared} />
        </Center>
      </group>
    </Float>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.35} color="#fff8f2" />
      <directionalLight position={[-3, 2, -1]} intensity={0.35} color="#d7e4ff" />
      <pointLight position={[2.2, 1.4, 1.6]} intensity={0.55} color={accent} />
      <MacbookModel />
      <ContactShadows
        position={[1.2, -0.95, 0]}
        opacity={0.28}
        scale={8}
        blur={2.6}
        far={4}
        color="#2a1a20"
      />
      <Environment preset="apartment" />
    </>
  );
}

useGLTF.preload(MACBOOK_PATH);

type Props = {
  enabled?: boolean;
  accent?: string;
};

/** body 뒤 배경 — FE 포트폴리오 톤에 맞는 MacBook */
export default function BodyScene({ enabled = true, accent = '#b83253' }: Props) {
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
        camera={{ position: [0.2, 0.55, 4.2], fov: 32, near: 0.1, far: 50 }}
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
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.78;
`;
