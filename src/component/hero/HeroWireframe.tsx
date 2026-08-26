import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

const WIRE_GRAY = '#9aa3ad';

function AccentMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WIRE_GRAY,
        metalness: 0.45,
        roughness: 0.28,
        wireframe: true,
        transparent: true,
        opacity: 0.72,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.34;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.65} floatIntensity={0.95}>
      <mesh ref={meshRef} position={[1.45, 0.12, 0.25]} material={material}>
        <icosahedronGeometry args={[1.05, 1]} />
      </mesh>
    </Float>
  );
}

function HeroWireScene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 3, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[2.2, 0.6, 2.8]} intensity={0.9} color="#d7dde4" />
      <AccentMesh />
      <Stars radius={50} depth={36} count={520} factor={2.4} saturation={0} fade speed={0.55} />
    </>
  );
}

type Props = { enabled?: boolean };

/** 히어로 카드 안 — 회색 wireframe */
export default function HeroWireframe({ enabled = true }: Props) {
  if (!enabled) return null;

  return (
    <WireHost aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0.25, 0, 3.8], fov: 40 }}
      >
        <Suspense fallback={null}>
          <HeroWireScene />
        </Suspense>
      </Canvas>
    </WireHost>
  );
}

const WireHost = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`;
