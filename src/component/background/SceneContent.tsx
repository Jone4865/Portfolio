import { ContactShadows, Environment } from '@react-three/drei';

import { CONTACT_SHADOW } from 'constants/three/bodyScene';
import type { SceneContentProps } from 'types/components/bodyScene';

import MacbookModel from './MacbookModel';

export default function SceneContent({ accent }: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 3]} intensity={0.95} color="#fff8f2" />
      <directionalLight position={[-3, 2, -1]} intensity={0.22} color="#d7e4ff" />
      <pointLight position={[2.2, 1.4, 1.6]} intensity={0.28} color={accent} />
      <MacbookModel />
      <ContactShadows
        position={CONTACT_SHADOW.position}
        opacity={CONTACT_SHADOW.opacity}
        scale={CONTACT_SHADOW.scale}
        blur={CONTACT_SHADOW.blur}
        far={CONTACT_SHADOW.far}
        color={CONTACT_SHADOW.color}
      />
      <Environment preset="apartment" />
    </>
  );
}
