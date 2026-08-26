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
        metalness: 0.35,
        roughness: 0.28,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    [color],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.28;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.55} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[1.15, 0.1, 0]} material={material}>
        <icosahedronGeometry args={[1.05, 1]} />
      </mesh>
    </Float>
  );
}

function SoftOrb({ color }: AccentMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.x = -1.35 + Math.sin(t * 0.45) * 0.18;
    meshRef.current.position.y = -0.2 + Math.cos(t * 0.55) * 0.14;
  });

  return (
    <mesh ref={meshRef} position={[-1.35, -0.2, -0.4]}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.22}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 3, 2]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -1, 2]} intensity={0.8} color={accent} />
      <AccentMesh color={accent} />
      <SoftOrb color={accent} />
      <Stars radius={40} depth={30} count={420} factor={2.2} saturation={0} fade speed={0.5} />
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
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
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
  z-index: 1;
  pointer-events: none;
  opacity: 0.72;
  mix-blend-mode: screen;
`;
