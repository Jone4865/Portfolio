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
        metalness: 0.65,
        roughness: 0.12,
        wireframe: true,
        transparent: true,
        opacity: 1,
        emissive: color,
        emissiveIntensity: 0.55,
      }),
    [color],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.28;
    meshRef.current.rotation.y += delta * 0.42;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.85} floatIntensity={1.25}>
      <mesh ref={meshRef} position={[1.75, 0.05, 0.55]} material={material} scale={1.25}>
        <icosahedronGeometry args={[1.55, 1]} />
      </mesh>
    </Float>
  );
}

function SoftOrb({ color }: AccentMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.x = -1.55 + Math.sin(t * 0.45) * 0.22;
    meshRef.current.position.y = -0.15 + Math.cos(t * 0.55) * 0.18;
  });

  return (
    <mesh ref={meshRef} position={[-1.85, -0.25, -0.45]}>
      <sphereGeometry args={[0.62, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.28}
        roughness={0.5}
        metalness={0.15}
        emissive={color}
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function Ring({ color }: AccentMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z -= delta * 0.18;
    meshRef.current.rotation.x += delta * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0.2, 0.35, -0.6]} rotation={[0.7, 0.2, 0.1]}>
      <torusGeometry args={[1.55, 0.035, 16, 80]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        metalness={0.4}
        roughness={0.25}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function SceneContent({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 3, 4]} intensity={1.7} color="#ffffff" />
      <pointLight position={[2.4, 0.8, 3.2]} intensity={2.1} color={accent} />
      <pointLight position={[-2, -1, 2]} intensity={0.9} color={accent} />
      <AccentMesh color={accent} />
      <SoftOrb color={accent} />
      <Ring color={accent} />
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
        camera={{ position: [0.35, 0, 3.6], fov: 40 }}
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
