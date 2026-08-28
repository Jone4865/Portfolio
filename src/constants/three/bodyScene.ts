/** CC-BY-4.0 — jackbaeten MacBook Pro M3 (via wistant/landing-macbook) */
export const MACBOOK_MODEL_PATH = '/models/macbook.glb';

export const BODY_SCENE_OPACITY = 0.32;

export const BODY_CAMERA = {
  position: [0.2, 0.55, 4.2] as [number, number, number],
  fov: 32,
  near: 0.1,
  far: 50,
};

export const MACBOOK_GROUP = {
  position: [1.35, -0.15, 0] as [number, number, number],
  scale: 0.085,
};

export const CONTACT_SHADOW = {
  position: [1.2, -0.95, 0] as [number, number, number],
  opacity: 0.14,
  scale: 8,
  blur: 3.2,
  far: 4,
  color: '#2a1a20',
};
