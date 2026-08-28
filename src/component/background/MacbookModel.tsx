import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { MACBOOK_GROUP, MACBOOK_MODEL_PATH } from 'constants/three/bodyScene';

export default function MacbookModel() {
  const { scene } = useGLTF(MACBOOK_MODEL_PATH);
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
      <group ref={group} position={MACBOOK_GROUP.position} scale={MACBOOK_GROUP.scale}>
        <Center>
          <primitive object={prepared} />
        </Center>
      </group>
    </Float>
  );
}

useGLTF.preload(MACBOOK_MODEL_PATH);
