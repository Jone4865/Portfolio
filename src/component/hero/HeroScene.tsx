import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

const NEON = '#ff4d8d';
const NEON_SOFT = '#ff7aa8';
const WALL = '#c8ccd2';
const FLOOR = '#d6c4a8';
const DESK = '#f2f4f7';
const DARK = '#1a1d24';
const SCREEN = '#0b1020';
const CITY = '#0a1428';

function Box({
  args,
  position,
  rotation,
  color,
  metalness = 0.05,
  roughness = 0.72,
  emissive,
  emissiveIntensity = 0,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

function Cylinder({
  args,
  position,
  color,
  roughness = 0.7,
}: {
  args: [number, number, number, number?];
  position?: [number, number, number];
  color: string;
  roughness?: number;
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={0.05} />
    </mesh>
  );
}

function RoomShell() {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0, 0.1]} receiveShadow>
        <planeGeometry args={[7.2, 6.4]} />
        <meshStandardMaterial color={FLOOR} roughness={0.9} metalness={0.02} />
      </mesh>
      {/* back wall */}
      <mesh position={[0.35, 1.55, -2.35]} receiveShadow>
        <boxGeometry args={[6.8, 3.2, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* left wall */}
      <mesh position={[-2.85, 1.55, 0.15]} receiveShadow>
        <boxGeometry args={[0.12, 3.2, 5.2]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
    </group>
  );
}

function CityOutside() {
  const buildings = useMemo(
    () =>
      [
        [-0.9, 0.55, 0.35, 1.1],
        [-0.35, 0.85, 0.4, 1.7],
        [0.2, 0.45, 0.32, 0.9],
        [0.65, 1.05, 0.38, 2.1],
        [1.15, 0.7, 0.3, 1.4],
        [1.55, 0.5, 0.28, 1.0],
        [-1.35, 0.65, 0.28, 1.3],
      ] as [number, number, number, number][],
    [],
  );

  return (
    <group position={[-3.2, 0.95, -0.55]}>
      <mesh position={[0.3, 0.4, -0.8]}>
        <boxGeometry args={[4.2, 2.6, 0.08]} />
        <meshStandardMaterial color={CITY} roughness={1} />
      </mesh>
      {buildings.map(([x, h, w, depth], i) => (
        <mesh key={i} position={[x, h / 2 - 0.35, -0.35]}>
          <boxGeometry args={[w, h, depth]} />
          <meshStandardMaterial
            color="#121c33"
            emissive="#4f7cff"
            emissiveIntensity={0.18 + (i % 3) * 0.08}
            roughness={0.85}
          />
        </mesh>
      ))}
      {/* landmark tower */}
      <mesh position={[0.05, 1.05, -0.15]}>
        <cylinderGeometry args={[0.05, 0.08, 1.9, 8]} />
        <meshStandardMaterial color="#dce8ff" emissive="#88aaff" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0.05, 1.95, -0.15]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#a8c4ff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.05, 2.2, -0.15]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#c5d8ff" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

function WindowFrame() {
  return (
    <group position={[-2.78, 1.45, -0.35]}>
      <Box args={[0.08, 1.7, 2.35]} position={[0, 0, 0]} color="#eceff3" />
      {/* sash */}
      <Box args={[0.06, 1.55, 0.06]} position={[0.02, 0, 0]} color="#f7f8fa" />
      <Box args={[0.06, 0.06, 2.1]} position={[0.02, 0, 0]} color="#f7f8fa" />
      {/* open pane lean */}
      <mesh position={[0.35, 0.05, 0.95]} rotation={[0, -0.55, 0]}>
        <boxGeometry args={[0.05, 1.45, 0.95]} />
        <meshStandardMaterial color="#eef1f5" roughness={0.55} metalness={0.1} transparent opacity={0.35} />
      </mesh>
      {/* sill */}
      <Box args={[0.35, 0.08, 2.45]} position={[0.18, -0.9, 0]} color="#eceff3" />
    </group>
  );
}

function DeskSetup({ accent }: { accent: string }) {
  const glow = accent || NEON;

  return (
    <group position={[0.55, 0, -0.55]}>
      {/* desk top */}
      <Box args={[2.55, 0.08, 1.15]} position={[0, 0.78, 0.15]} color={DESK} roughness={0.45} />
      {/* legs */}
      {[
        [-1.1, 0.39, 0.55],
        [1.1, 0.39, 0.55],
        [-1.1, 0.39, -0.25],
        [1.1, 0.39, -0.25],
      ].map((p, i) => (
        <Box key={i} args={[0.06, 0.78, 0.06]} position={p as [number, number, number]} color={DARK} />
      ))}

      {/* dual monitors */}
      <group position={[0.05, 1.22, -0.18]}>
        <Box args={[0.08, 0.55, 0.08]} position={[0, -0.2, 0]} color="#2a2e36" />
        <Box args={[1.55, 0.05, 0.08]} position={[0, 0.05, 0]} color="#2a2e36" />
        {/* left screen */}
        <Box args={[0.72, 0.48, 0.04]} position={[-0.4, 0.28, 0.02]} color="#11151c" />
        <mesh position={[-0.4, 0.28, 0.045]}>
          <planeGeometry args={[0.62, 0.38]} />
          <meshStandardMaterial color={SCREEN} emissive="#5b8cff" emissiveIntensity={0.45} />
        </mesh>
        {/* right screen */}
        <Box args={[0.72, 0.48, 0.04]} position={[0.4, 0.28, 0.02]} color="#11151c" />
        <mesh position={[0.4, 0.28, 0.045]}>
          <planeGeometry args={[0.62, 0.38]} />
          <meshStandardMaterial color={SCREEN} emissive={glow} emissiveIntensity={0.35} />
        </mesh>
      </group>

      {/* PC tower */}
      <group position={[1.05, 1.05, -0.15]}>
        <Box args={[0.42, 0.62, 0.55]} color="#f4f6f8" roughness={0.35} />
        <mesh position={[-0.215, 0, 0]}>
          <boxGeometry args={[0.02, 0.5, 0.42]} />
          <meshStandardMaterial
            color="#1b0a12"
            emissive={glow}
            emissiveIntensity={0.85}
            transparent
            opacity={0.85}
          />
        </mesh>
        <pointLight position={[-0.35, 0, 0.1]} intensity={1.6} distance={2.4} color={glow} />
      </group>

      {/* speakers */}
      <Box args={[0.16, 0.22, 0.16]} position={[-0.95, 0.93, 0.05]} color={DESK} />
      <Box args={[0.16, 0.22, 0.16]} position={[0.55, 0.93, 0.05]} color={DESK} />

      {/* keyboard + neon underglow */}
      <group position={[-0.15, 0.84, 0.38]}>
        <Box args={[0.72, 0.05, 0.28]} color="#f7f8fa" roughness={0.4} />
        {[
          [-0.22, 0.04, 0],
          [0, 0.04, 0],
          [0.22, 0.04, 0],
        ].map((p, i) => (
          <Box
            key={i}
            args={[0.16, 0.04, 0.16]}
            position={p as [number, number, number]}
            color="#eef0f3"
          />
        ))}
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.78, 0.34]} />
          <meshStandardMaterial
            color={glow}
            emissive={glow}
            emissiveIntensity={0.9}
            transparent
            opacity={0.55}
          />
        </mesh>
        <pointLight position={[0, -0.05, 0.05]} intensity={1.35} distance={1.8} color={glow} />
      </group>

      {/* mouse */}
      <Box args={[0.12, 0.035, 0.18]} position={[0.42, 0.84, 0.42]} color="#f7f8fa" />

      {/* controller */}
      <Box args={[0.28, 0.05, 0.16]} position={[0.78, 0.84, 0.42]} color="#f0f2f5" />

      {/* phone dock */}
      <group position={[-0.85, 0.84, 0.35]}>
        <Box args={[0.12, 0.03, 0.12]} color="#11151c" emissive={glow} emissiveIntensity={0.4} />
        <Box args={[0.07, 0.22, 0.02]} position={[0, 0.12, 0]} color="#e8eaee" rotation={[0.12, 0, 0]} />
        <pointLight position={[0, 0.02, 0.08]} intensity={0.7} distance={1.1} color={glow} />
      </group>

      {/* mug */}
      <Cylinder args={[0.055, 0.06, 0.12, 16]} position={[-0.55, 0.9, 0.12]} color="#f5f6f8" />
    </group>
  );
}

function WallDecor({ accent }: { accent: string }) {
  const glow = accent || NEON;
  const digitRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (digitRef.current) {
      digitRef.current.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 2.2) * 0.15;
    }
  });

  return (
    <group>
      {/* pixel board */}
      <group position={[0.35, 2.15, -2.26]}>
        <Box args={[1.55, 0.42, 0.06]} color={DARK} />
        <mesh position={[-0.48, 0, 0.04]}>
          <planeGeometry args={[0.28, 0.28]} />
          <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.75} />
        </mesh>
        <mesh position={[0.28, 0, 0.04]}>
          <planeGeometry args={[0.85, 0.26]} />
          <meshStandardMaterial
            ref={digitRef}
            color={glow}
            emissive={glow}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* round wall badge */}
      <mesh position={[-1.35, 1.85, -2.26]}>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 28]} />
        <meshStandardMaterial color="#f4f6f8" roughness={0.4} />
      </mesh>
      <mesh position={[-1.35, 1.85, -2.22]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 24]} />
        <meshStandardMaterial color="#22c55e" emissive="#4ade80" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[1.85, 0, 1.35]}>
      <Cylinder args={[0.18, 0.16, 0.28, 20]} position={[0, 0.14, 0]} color="#f3f5f7" />
      {[
        [0, 0.45, 0, 0.55],
        [0.08, 0.42, 0.05, 0.45],
        [-0.07, 0.4, -0.04, 0.42],
        [0.04, 0.38, -0.08, 0.38],
      ].map(([x, y, z, h], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <coneGeometry args={[0.07, h, 7]} />
          <meshStandardMaterial color={i % 2 ? '#2f7a45' : '#3f9a58'} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = 2.55 + Math.sin(t * 0.18) * 0.08;
    state.camera.position.y = 2.35 + Math.cos(t * 0.22) * 0.05;
    state.camera.position.z = 3.15 + Math.sin(t * 0.15) * 0.06;
    state.camera.lookAt(0.15, 0.85, -0.35);
  });
  return null;
}

function SceneContent({ accent }: { accent: string }) {
  const neon = accent || NEON;

  return (
    <>
      <color attach="background" args={['#1a2030']} />
      <fog attach="fog" args={['#1a2030', 7, 14]} />

      <ambientLight intensity={0.28} />
      <directionalLight
        castShadow
        position={[2.8, 4.2, 2.2]}
        intensity={1.15}
        color="#fff4ea"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* cool light from window */}
      <pointLight position={[-2.2, 1.6, -0.2]} intensity={1.4} distance={5} color="#8eb6ff" />
      <pointLight position={[0.4, 2.4, -1.5]} intensity={0.35} distance={4} color={NEON_SOFT} />

      <RoomShell />
      <CityOutside />
      <WindowFrame />
      <DeskSetup accent={neon} />
      <WallDecor accent={neon} />
      <Plant />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        scale={8}
        blur={2.4}
        far={4}
        color="#0a0c12"
      />
      <CameraDrift />
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
        shadows
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [2.55, 2.35, 3.15], fov: 38, near: 0.1, far: 40 }}
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
