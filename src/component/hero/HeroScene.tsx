import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

type ModelProps = {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function GltfModel({ path, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => {
    const next = scene.clone(true);
    next.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return next;
  }, [scene]);

  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

function DeskVignette() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.35 + Math.sin(t * 0.15) * 0.04;
    group.current.position.y = Math.sin(t * 0.35) * 0.02;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={group} position={[0.85, -0.55, 0]} rotation={[0.08, -0.55, 0]}>
        <Center top>
          <GltfModel path="/models/office-desk-021eb3.glb" scale={1.15} />
        </Center>
        <GltfModel
          path="/models/desk-monitor-32cfce.glb"
          position={[0.05, 0.78, -0.12]}
          rotation={[0, 0.05, 0]}
          scale={1.05}
        />
        <GltfModel
          path="/models/table-lamp-e25998.glb"
          position={[-0.55, 0.78, 0.18]}
          scale={0.95}
        />
        <GltfModel
          path="/models/floor-houseplant-8fad17.glb"
          position={[1.15, 0, 0.45]}
          scale={1.1}
        />
        <GltfModel
          path="/models/filing-cabinet-f8a251.glb"
          position={[-1.05, 0, -0.15]}
          rotation={[0, 0.4, 0]}
          scale={0.95}
        />
      </group>
    </Float>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.5, 4.5, 2.5]} intensity={1.25} color="#fff7f0" castShadow />
      <pointLight position={[-1.5, 2, 1]} intensity={0.45} color="#b8d4ff" />
      <pointLight position={[1.2, 1.4, 0.8]} intensity={0.55} color={accent} />
      <DeskVignette />
      <Environment preset="city" />
    </>
  );
}

useGLTF.preload('/models/office-desk-021eb3.glb');
useGLTF.preload('/models/desk-monitor-32cfce.glb');
useGLTF.preload('/models/table-lamp-e25998.glb');
useGLTF.preload('/models/floor-houseplant-8fad17.glb');
useGLTF.preload('/models/filing-cabinet-f8a251.glb');

type Props = {
  enabled?: boolean;
  accent?: string;
};

/** 히어로 사진 뒤 — 다운로드한 GLB 데스크 비네트 */
export default function HeroScene({ enabled = true, accent = '#fb7185' }: Props) {
  if (!enabled) return null;

  return (
    <CanvasHost aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [1.6, 1.35, 2.8], fov: 36, near: 0.1, far: 40 }}
      >
        <Suspense fallback={null}>
          <SceneContent accent={accent} />
        </Suspense>
      </Canvas>
    </CanvasHost>
  );
}

const CanvasHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;
