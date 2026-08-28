import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import { WIRE_GRAY, WIRE_MATERIAL, WIREFRAME_MESH } from 'constants/three/heroWireframe';

export default function AccentMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WIRE_GRAY,
        metalness: WIRE_MATERIAL.metalness,
        roughness: WIRE_MATERIAL.roughness,
        wireframe: true,
        transparent: true,
        opacity: WIRE_MATERIAL.opacity,
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
      <mesh ref={meshRef} position={WIREFRAME_MESH.position} material={material}>
        <icosahedronGeometry args={[WIREFRAME_MESH.radius, WIREFRAME_MESH.detail]} />
      </mesh>
    </Float>
  );
}
