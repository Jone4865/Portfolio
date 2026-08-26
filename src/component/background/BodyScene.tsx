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
    group.current.rotation.y = -0.55 + Math.sin(t * 0.12) * 0.05;
    group.current.position.y = -0.35 + Math.sin(t * 0.28) * 0.03;
  });

  return (
    <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.18}>
      <group ref={group} position={[1.55, -0.2, -0.2]} rotation={[0.12, -0.7, 0.04]}>
        <Center top>
          <GltfModel path="/models/office-desk-021eb3.glb" scale={1.35} />
        </Center>
        <GltfModel
          path="/models/desk-monitor-32cfce.glb"
          position={[0.05, 0.78, -0.12]}
          rotation={[0, 0.05, 0]}
          scale={1.15}
        />
        <GltfModel
          path="/models/table-lamp-e25998.glb"
          position={[-0.55, 0.78, 0.18]}
          scale={1}
        />
        <GltfModel
          path="/models/floor-houseplant-8fad17.glb"
          position={[1.25, 0, 0.5]}
          scale={1.2}
        />
        <GltfModel
          path="/models/filing-cabinet-f8a251.glb"
          position={[-1.15, 0, -0.2]}
          rotation={[0, 0.45, 0]}
          scale={1}
        />
      </group>
    </Float>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} color="#fff7f0" />
      <pointLight position={[-2, 2.2, 1.5]} intensity={0.4} color="#c5d8ff" />
      <pointLight position={[2.2, 1.6, 1]} intensity={0.5} color={accent} />
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

/** body 고정 배경 — GLB 데스크 비네트 */
export default function BodyScene({ enabled = true, accent = '#fb7185' }: Props) {
  if (!enabled) return null;

  return (
    <CanvasHost aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [2.4, 1.6, 3.4], fov: 34, near: 0.1, far: 40 }}
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
  opacity: 0.55;
`;
