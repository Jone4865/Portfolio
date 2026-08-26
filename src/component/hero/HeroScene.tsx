import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

type AccentMeshProps = {
  color: string;
};

function AccentMesh({ color }: AccentMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.55,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.78,
        emissive: color,
        emissiveIntensity: 0.28,
      }),
    [color],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.24;
    meshRef.current.rotation.y += delta * 0.36;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.05}>
      <mesh ref={meshRef} position={[1.55, 0.1, 0.35]} material={material} scale={1.05}>
        <icosahedronGeometry args={[1.4, 1]} />
      </mesh>
    </Float>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 3, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[2.2, 0.6, 2.8]} intensity={1.5} color={accent} />
      <AccentMesh color={accent} />
      <Stars radius={50} depth={36} count={700} factor={2.8} saturation={0} fade speed={0.7} />
    </>
  );
}

type Props = {
  enabled?: boolean;
  accent: string;
};

export default function HeroScene({ enabled = true, accent }: Props) {
  if (!enabled) return null;

  return (
    <CanvasHost aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0.25, 0, 3.7], fov: 40 }}
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
  z-index: 2;
  pointer-events: none;
  opacity: 1;
`;
