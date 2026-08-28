import { Stars } from '@react-three/drei';

import { HERO_STARS } from 'constants/three/heroWireframe';

import AccentMesh from './AccentMesh';

export default function HeroWireScene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 3, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[2.2, 0.6, 2.8]} intensity={0.9} color="#d7dde4" />
      <AccentMesh />
      <Stars
        radius={HERO_STARS.radius}
        depth={HERO_STARS.depth}
        count={HERO_STARS.count}
        factor={HERO_STARS.factor}
        saturation={0}
        fade
        speed={HERO_STARS.speed}
      />
    </>
  );
}
