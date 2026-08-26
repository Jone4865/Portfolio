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
        roughness: 0.18,
        wireframe: true,
        transparent: true,
        opacity: 0.92,
      }),
    [color],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.34;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.1}>
      <mesh ref={meshRef} position={[1.35, 0.15, 0.2]} material={material}>
        <icosahedronGeometry args={[1.45, 1]} />
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
    <mesh ref={meshRef} position={[-1.55, -0.15, -0.2]}>
      <sphereGeometry args={[0.78, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.48}
        roughness={0.45}
        metalness={0.2}
        emissive={color}
        emissiveIntensity={0.35}
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
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 3, 2]} intensity={1.35} color="#ffffff" />
      <pointLight position={[-3, -1, 2]} intensity={1.4} color={accent} />
      <pointLight position={[2, 2, 3]} intensity={0.7} color="#ffffff" />
      <AccentMesh color={accent} />
      <SoftOrb color={accent} />
      <Ring color={accent} />
      <Stars radius={50} depth={36} count={900} factor={3.2} saturation={0} fade speed={0.7} />
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
        camera={{ position: [0, 0, 4.0], fov: 42 }}
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
