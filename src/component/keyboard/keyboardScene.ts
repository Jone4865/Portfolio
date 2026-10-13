/**
 * 절차적으로 만든 3D 기계식 키보드 — "키보드 위에서 춤추는 손가락".
 *
 * - 스튜디오 조명(PMREM 환경맵) + 오렌지 액센트 키캡
 * - 커서를 따라 살짝 기울고, 실제 키 입력(그리고 터치 탭)에 키캡이 스프링처럼 눌립니다.
 * - 히어로가 보이지 않거나 탭이 숨겨지면 렌더 루프를 멈춥니다.
 * - 휴대폰에서는 F열·그림자·베벨 분할을 줄이고 DPR을 1.5로 제한합니다.
 *
 * 이 모듈은 첫 페인트 이후 동적 import로만 불러옵니다(three 청크 분리).
 */
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  CapsuleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Raycaster,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from 'three';

export type KeyboardSceneOptions = {
  mobile: boolean;
  dark: boolean;
  /** 실제/유령 입력 문자를 하단 티커로 전달 ('\b' 지우기, '\n' 줄바꿈) */
  onType?: (ch: string) => void;
  /** 첫 프레임을 그린 뒤 호출 — 캔버스 페이드 인 용도 */
  onReady?: () => void;
};

export type KeyboardSceneHandle = {
  setActive: (active: boolean) => void;
  setDark: (dark: boolean) => void;
  dispose: () => void;
};

type KeyDef = { label: string; code: string; w: number; t: 'a' | 'm' | 'x' };
type GapDef = { gap: number };
type KeyState = {
  k: KeyDef;
  g: Group;
  lm: MeshBasicMaterial;
  base: Color;
  y: number;
  v: number;
  down: boolean;
  heat: number;
};

const HANGUL: Record<string, string> = {
  KeyQ: 'ㅂ',
  KeyW: 'ㅈ',
  KeyE: 'ㄷ',
  KeyR: 'ㄱ',
  KeyT: 'ㅅ',
  KeyY: 'ㅛ',
  KeyU: 'ㅕ',
  KeyI: 'ㅑ',
  KeyO: 'ㅐ',
  KeyP: 'ㅔ',
  KeyA: 'ㅁ',
  KeyS: 'ㄴ',
  KeyD: 'ㅇ',
  KeyF: 'ㄹ',
  KeyG: 'ㅎ',
  KeyH: 'ㅗ',
  KeyJ: 'ㅓ',
  KeyK: 'ㅏ',
  KeyL: 'ㅣ',
  KeyZ: 'ㅋ',
  KeyX: 'ㅌ',
  KeyC: 'ㅊ',
  KeyV: 'ㅍ',
  KeyB: 'ㅠ',
  KeyN: 'ㅜ',
  KeyM: 'ㅡ',
};
const ALIAS: Record<string, string> = {
  MetaRight: 'MetaLeft',
  OSLeft: 'MetaLeft',
  OSRight: 'MetaLeft',
  Lang1: 'AltRight',
  Lang2: 'ControlRight',
  HangulMode: 'AltRight',
  Hanja: 'ControlRight',
  NumpadEnter: 'Enter',
};
/** 유령 타이핑 — 실제 기술 스택에서 가져온 단어만 씁니다. */
const GHOST_WORDS = ['surf', 'react', 'vue', 'typescript', 'next'];

const PRESS_DEPTH = -0.19;
const GAP = 0.1;
const H = 0.46;
const BS = 0.07;
const BT = 0.07;
const INSET = 0.085;

function buildRows(mobile: boolean): (KeyDef | GapDef)[][] {
  const K = (label: string, code: string, w = 1, t: KeyDef['t'] = 'a'): KeyDef => ({
    label,
    code,
    w,
    t,
  });
  const G = (w: number): GapDef => ({ gap: w });
  const letters = (s: string) =>
    s.split('').map((ch) => K(ch.toUpperCase(), 'Key' + ch.toUpperCase()));
  const rows: (KeyDef | GapDef)[][] = [];
  if (!mobile) {
    rows.push([
      K('esc', 'Escape', 1, 'x'),
      G(0.5),
      ...[1, 2, 3, 4].map((n) => K('F' + n, 'F' + n, 1, 'm')),
      G(0.25),
      ...[5, 6, 7, 8].map((n) => K('F' + n, 'F' + n, 1, 'm')),
      G(0.25),
      ...[9, 10, 11, 12].map((n) => K('F' + n, 'F' + n, 1, 'm')),
      G(0.25),
      K('del', 'Delete', 1, 'm'),
    ]);
  }
  rows.push([
    K('~', 'Backquote', 1, mobile ? 'x' : 'a'),
    ...'1234567890'.split('').map((n) => K(n, 'Digit' + n)),
    K('-', 'Minus'),
    K('=', 'Equal'),
    K('⌫', 'Backspace', 2, 'm'),
    K('home', 'Home', 1, 'm'),
  ]);
  rows.push([
    K('tab', 'Tab', 1.5, 'm'),
    ...letters('qwertyuiop'),
    K('[', 'BracketLeft'),
    K(']', 'BracketRight'),
    K('\\', 'Backslash', 1.5),
    K('pgup', 'PageUp', 1, 'm'),
  ]);
  rows.push([
    K('caps', 'CapsLock', 1.75, 'm'),
    ...letters('asdfghjkl'),
    K(';', 'Semicolon'),
    K("'", 'Quote'),
    K('enter', 'Enter', 2.25, 'x'),
    K('pgdn', 'PageDown', 1, 'm'),
  ]);
  rows.push([
    K('shift', 'ShiftLeft', 2.25, 'm'),
    ...letters('zxcvbnm'),
    K(',', 'Comma'),
    K('.', 'Period'),
    K('/', 'Slash'),
    K('shift', 'ShiftRight', 1.75, 'm'),
    K('↑', 'ArrowUp', 1, 'x'),
    K('end', 'End', 1, 'm'),
  ]);
  rows.push([
    K('ctrl', 'ControlLeft', 1.25, 'm'),
    K('⌘', 'MetaLeft', 1.25, 'm'),
    K('alt', 'AltLeft', 1.25, 'm'),
    K('', 'Space', 6.25, 'a'),
    K('한/영', 'AltRight', 1, 'm'),
    K('한자', 'ControlRight', 1, 'm'),
    K('fn', 'Fn', 1, 'm'),
    K('←', 'ArrowLeft', 1, 'x'),
    K('↓', 'ArrowDown', 1, 'x'),
    K('→', 'ArrowRight', 1, 'x'),
  ]);
  return rows;
}

function roundShape(w: number, d: number, r: number) {
  const s = new Shape();
  const x = -w / 2;
  const y = -d / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + d - r);
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d);
  s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function radialTex(stops: [number, string][]) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d')!;
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function createKeyboardScene(
  host: HTMLElement,
  opts: KeyboardSceneOptions,
): KeyboardSceneHandle {
  const MOBILE = opts.mobile;
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onType = opts.onType ?? (() => undefined);
  let dark = opts.dark;

  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: MOBILE ? 'low-power' : 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE ? 1.5 : 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !MOBILE;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.setClearColor(0x000000, 0);
  const cv = renderer.domElement;
  cv.setAttribute('aria-hidden', 'true');
  cv.style.display = 'block';
  cv.style.width = '100%';
  cv.style.height = '100%';
  cv.style.outline = 'none';
  cv.style.touchAction = 'pan-y';
  host.appendChild(cv);

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 100);
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T) => {
    disposables.push(o);
    return o;
  };

  /* 절차적 스튜디오 환경 — 소프트박스 몇 장을 PMREM으로 굽습니다. */
  {
    const env = new Scene();
    const sg = new SphereGeometry(30, 32, 16);
    const cols: number[] = [];
    const p = sg.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = Math.max(0, p.getY(i) / 30);
      cols.push(0.02 + 0.1 * y, 0.02 + 0.1 * y, 0.025 + 0.12 * y);
    }
    sg.setAttribute('color', new Float32BufferAttribute(cols, 3));
    env.add(new Mesh(sg, new MeshBasicMaterial({ vertexColors: true, side: BackSide })));
    const box = (w: number, h: number, col: Color, pos: [number, number, number]) => {
      const m = new Mesh(
        new PlaneGeometry(w, h),
        new MeshBasicMaterial({ color: col, side: DoubleSide }),
      );
      m.position.set(...pos);
      m.lookAt(0, 0, 0);
      env.add(m);
    };
    box(18, 8, new Color(3.2, 3.1, 3.0), [-2, 14, 4]); // overhead softbox
    box(4, 16, new Color(1.6, 1.7, 2.0), [-14, 4, 2]); // cool strip
    box(6, 10, new Color(4.0, 1.3, 0.6), [12, 3, -8]); // warm rim
    box(14, 2, new Color(1.2, 1.2, 1.2), [0, 2, 14]); // front kicker
    const pm = new PMREMGenerator(renderer);
    scene.environment = track(pm.fromScene(env, 0.035).texture);
    pm.dispose();
    env.traverse((o: Object3D) => {
      const m = o as Mesh;
      if (m.isMesh) {
        m.geometry.dispose();
        (m.material as MeshBasicMaterial).dispose();
      }
    });
  }

  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(-3, 9, 5);
  key.castShadow = !MOBILE;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 4, bottom: -4, near: 1, far: 25 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 3;
  scene.add(key);
  const rim = new DirectionalLight(0xff7a4a, 1.4);
  rim.position.set(6, 2.5, -6);
  scene.add(rim);
  scene.add(new HemisphereLight(0x9aa4c0, 0x120a08, 0.25));

  /* ---- 키캡 ---- */
  const rows = buildRows(MOBILE);
  const geoCache: Record<string, ExtrudeGeometry> = {};
  function capGeo(w: number) {
    const id = String(w);
    if (geoCache[id]) return geoCache[id];
    const bw = w - GAP;
    const bd = 1 - GAP;
    const g = new ExtrudeGeometry(roundShape(bw - 2 * BS, bd - 2 * BS, 0.07), {
      depth: H - 2 * BT,
      bevelEnabled: true,
      bevelThickness: BT,
      bevelSize: BS,
      bevelSegments: MOBILE ? 2 : 4,
      curveSegments: MOBILE ? 3 : 5,
    });
    g.rotateX(-Math.PI / 2);
    g.translate(0, BT, 0);
    const p = g.attributes.position;
    const hx = bw / 2;
    const hz = bd / 2;
    for (let i = 0; i < p.count; i++) {
      const t = Math.min(1, Math.max(0, p.getY(i) / H));
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setX(i, (x * (hx - INSET * t)) / hx);
      p.setZ(i, (z * (hz - INSET * t)) / hz);
      if (t > 0.97) p.setY(i, p.getY(i) - 0.012 * (1 - (x * x) / (hx * hx))); // 살짝 오목한 상판
    }
    g.computeVertexNormals();
    geoCache[id] = track(g);
    return g;
  }
  const MAT = {
    a: track(
      new MeshPhysicalMaterial({
        color: 0xe8e5de,
        roughness: 0.58,
        clearcoat: 0.2,
        clearcoatRoughness: 0.5,
        sheen: 0.3,
        sheenColor: 0xffffff,
      }),
    ),
    m: track(
      new MeshPhysicalMaterial({
        color: 0x3b3d43,
        roughness: 0.5,
        clearcoat: 0.25,
        clearcoatRoughness: 0.45,
      }),
    ),
    x: track(
      new MeshPhysicalMaterial({
        color: 0xff5a2c,
        roughness: 0.42,
        clearcoat: 0.45,
        clearcoatRoughness: 0.3,
      }),
    ),
  };
  const INK = { a: new Color(0x2c2c2e), m: new Color(0xd9d6cf), x: new Color(0xfff4ee) };
  const HOT = new Color(0xff5a2c);
  const HOT2 = new Color(0xffffff);

  const PPU = MOBILE ? 140 : 220;
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  function legendTex(k: KeyDef, pw: number, pd: number) {
    const cw = Math.round(pw * PPU);
    const ch = Math.round(pd * PPU);
    const c = document.createElement('canvas');
    c.width = cw;
    c.height = ch;
    const x = c.getContext('2d')!;
    x.fillStyle = '#fff';
    x.textBaseline = 'alphabetic';
    const pad = PPU * 0.07;
    const isFn = /^F\d+$/.test(k.label);
    const isWord = k.label.length > 1 && !/^[←→↑↓⌫⌘]$/.test(k.label) && !isFn;
    if (k.t === 'a' && k.label.length === 1 && HANGUL[k.code]) {
      x.font = `500 ${PPU * 0.2}px "JetBrains Mono", monospace`;
      x.fillText(k.label, pad, pad + PPU * 0.17);
      x.font = `500 ${PPU * 0.17}px "IBM Plex Sans KR", sans-serif`;
      x.globalAlpha = 0.55;
      x.textAlign = 'right';
      x.fillText(HANGUL[k.code], cw - pad, ch - pad);
      x.globalAlpha = 1;
    } else if (isWord) {
      x.font = `500 ${PPU * (/[가-힣]/.test(k.label) ? 0.13 : 0.12)}px "JetBrains Mono", "IBM Plex Sans KR", monospace`;
      x.fillText(k.label, pad, ch - pad);
    } else if (k.label) {
      x.font = `500 ${PPU * (isFn ? 0.13 : 0.21)}px "JetBrains Mono", "IBM Plex Sans KR", monospace`;
      if (isFn) x.fillText(k.label, pad, ch - pad);
      else {
        x.textAlign = 'center';
        x.fillText(k.label, cw / 2, ch / 2 + PPU * 0.075);
      }
    }
    if (k.code === 'KeyF' || k.code === 'KeyJ') {
      x.globalAlpha = 0.6;
      x.fillRect(cw / 2 - PPU * 0.08, ch - pad * 0.9, PPU * 0.16, PPU * 0.025);
      x.globalAlpha = 1;
    }
    if (k.code === 'Space') {
      x.font = `500 ${PPU * 0.11}px "JetBrains Mono", monospace`;
      x.globalAlpha = 0.35;
      x.textAlign = 'center';
      x.fillText('~ surf ~', cw / 2, ch / 2 + PPU * 0.04);
      x.globalAlpha = 1;
    }
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = maxAniso;
    return track(tex);
  }

  const board = new Group(); // 떠 있는 루트
  const plate = new Group(); // 타이핑 각도
  board.add(plate);
  scene.add(board);
  const keys: KeyState[] = [];
  const byCode: Record<string, KeyState> = {};
  const caps: Mesh[] = [];
  const rowGap = MOBILE ? 0 : 0.25;
  const depth = rows.length + rowGap;
  rows.forEach((row, ri) => {
    let xu = -8;
    const z = -depth / 2 + 0.5 + ri + (!MOBILE && ri > 0 ? rowGap : 0);
    row.forEach((item) => {
      if ('gap' in item) {
        xu += item.gap;
        return;
      }
      const k = item;
      const g = new Group();
      g.position.set(xu + k.w / 2, 0, z);
      const cap = new Mesh(capGeo(k.w), MAT[k.t]);
      cap.castShadow = !MOBILE;
      cap.receiveShadow = !MOBILE;
      g.add(cap);
      const pw = k.w - GAP - 2 * INSET - 2 * BS + 0.02;
      const pd = 1 - GAP - 2 * INSET - 2 * BS + 0.02;
      const lm = track(
        new MeshBasicMaterial({
          map: legendTex(k, pw, pd),
          transparent: true,
          color: INK[k.t].clone(),
          toneMapped: false,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        }),
      );
      const lgGeo = track(new PlaneGeometry(pw, pd).rotateX(-Math.PI / 2));
      const lg = new Mesh(lgGeo, lm);
      lg.position.y = H + 0.004;
      g.add(lg);
      plate.add(g);
      const o: KeyState = { k, g, lm, base: INK[k.t].clone(), y: 0, v: 0, down: false, heat: 0 };
      cap.userData.o = o;
      caps.push(cap);
      keys.push(o);
      byCode[k.code] = byCode[k.code] || o;
      xu += k.w;
    });
  });

  /* 케이스(알루미늄) + 안쪽 웰 + 상태 LED */
  const CW = 16 + 0.7;
  const CD = depth + 0.7;
  const CH = 0.62;
  let led: Mesh<CapsuleGeometry, MeshBasicMaterial>;
  {
    const g = track(
      new ExtrudeGeometry(roundShape(CW - 0.24, CD - 0.24, 0.38), {
        depth: CH - 0.24,
        bevelEnabled: true,
        bevelThickness: 0.12,
        bevelSize: 0.12,
        bevelSegments: MOBILE ? 3 : 5,
        curveSegments: MOBILE ? 6 : 10,
      }),
    );
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0.12 - CH, 0);
    const caseMat = track(
      new MeshPhysicalMaterial({
        color: 0x9c9fa6,
        metalness: 1,
        roughness: 0.32,
        clearcoat: 0.3,
        clearcoatRoughness: 0.4,
      }),
    );
    const cm = new Mesh(g, caseMat);
    cm.receiveShadow = !MOBILE;
    plate.add(cm);
    const wellGeo = track(
      new ExtrudeGeometry(roundShape(16.1, depth + 0.1, 0.14), {
        depth: 0.02,
        bevelEnabled: false,
        curveSegments: 6,
      })
        .rotateX(-Math.PI / 2)
        .translate(0, 0.005, 0),
    );
    const well = new Mesh(
      wellGeo,
      track(new MeshStandardMaterial({ color: 0x16171a, roughness: 0.7, metalness: 0.2 })),
    );
    well.receiveShadow = !MOBILE;
    plate.add(well);
    led = new Mesh(
      track(new CapsuleGeometry(0.05, 0.22, 4, 8).rotateZ(Math.PI / 2)),
      track(new MeshBasicMaterial({ color: 0xff5a2c, toneMapped: false })),
    );
    led.position.set(CW / 2 - 0.7, -CH + 0.08 + CH * 0.5, CD / 2 + 0.005);
    plate.add(led);
  }
  plate.rotation.x = 0.07; // 뒤쪽이 살짝 들린 타이핑 각도

  /* 바닥 글로우 + 부드러운 그림자 */
  const glowMat = track(
    new MeshBasicMaterial({
      map: radialTex([
        [0, 'rgba(255,110,60,.9)'],
        [0.35, 'rgba(255,80,40,.32)'],
        [0.7, 'rgba(255,70,30,.06)'],
        [1, 'rgba(255,70,30,0)'],
      ]),
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
      toneMapped: false,
    }),
  );
  const glowMesh = new Mesh(
    track(new PlaneGeometry(CW * 1.25, CD * 2.1).rotateX(-Math.PI / 2)),
    glowMat,
  );
  glowMesh.position.y = -CH - 0.25;
  plate.add(glowMesh);
  const shadowMat = track(
    new MeshBasicMaterial({
      map: radialTex([
        [0, 'rgba(0,0,0,.8)'],
        [0.6, 'rgba(0,0,0,.25)'],
        [1, 'rgba(0,0,0,0)'],
      ]),
      transparent: true,
      depthWrite: false,
    }),
  );
  const shadowMesh = new Mesh(
    track(new PlaneGeometry(CW * 1.25, CD * 1.9).rotateX(-Math.PI / 2)),
    shadowMat,
  );
  shadowMesh.position.y = -2.2;
  board.add(shadowMesh);
  board.scale.setScalar(0.4);

  /* ---- 프레이밍 ----
   * 보드는 원점에 두고, 카메라 view offset으로 화면 속 위치만 옮깁니다(왜곡 없이 오프축 이동).
   * - 넓은 무대(데스크톱): 카피를 가리지 않도록 오른쪽 아래
   * - 세로로 긴 무대(태블릿): 카피 아래 가운데
   * - 작은 블록(휴대폰): 블록 가운데를 꽉 채움
   */
  const baseRot = new Euler(0, -0.32, 0);
  const BOARD_W = 7.4; // 회전 후 화면에 보이는 대략의 보드 너비(월드 단위)
  function layout() {
    const r = host.getBoundingClientRect();
    const W = Math.max(1, r.width);
    const Hh = Math.max(1, r.height);
    renderer.setSize(W, Hh, false);
    camera.aspect = W / Hh;
    const side = W >= 900;
    const stacked = !side && Hh > W * 0.9;
    const share = side ? (W >= 1100 ? 0.5 : 0.52) : stacked ? 0.78 : 0.98;
    const cx = side ? 0.66 : 0.5;
    const cy = side ? 0.64 : stacked ? 0.65 : 0.52;
    const tanV = Math.tan(MathUtils.degToRad(camera.fov / 2));
    const dist = Math.max(9, BOARD_W / (2 * tanV * camera.aspect * share));
    const el = MathUtils.degToRad(side ? 38 : 46);
    camera.position.set(0, Math.sin(el) * dist, Math.cos(el) * dist);
    camera.lookAt(0, 0, 0);
    camera.setViewOffset(W, Hh, -(cx - 0.5) * W, -(cy - 0.5) * Hh, W, Hh);
    board.position.set(0, 0, 0);
    camera.updateProjectionMatrix();
  }
  layout();
  const ro = new ResizeObserver(() => {
    layout();
    if (!running) renderOnce();
  });
  ro.observe(host);

  /* ---- 상호작용 ---- */
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    tilt.tx = e.clientY / window.innerHeight - 0.5;
    tilt.ty = e.clientX / window.innerWidth - 0.5;
    if (!REDUCE) kick();
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  let glowBoost = 0;
  let lastUser = -1e9;
  function press(o: KeyState | undefined, on: boolean) {
    if (!o) return;
    if (on && !o.down) {
      o.v -= 2.2;
      glowBoost = Math.min(1.2, glowBoost + 0.5);
      o.heat = 1;
    }
    o.down = on;
    if (REDUCE) {
      o.y = on ? PRESS_DEPTH : 0;
      o.v = 0;
    }
    kick();
  }
  const isTextTarget = (t: EventTarget | null) => {
    const el = t as HTMLElement | null;
    const tag = el?.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || !!el?.isContentEditable;
  };
  const charOf = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') return '\b';
    if (e.key === 'Enter') return '\n';
    if (e.key === 'Process' || (e.key && /[ㄱ-ㅣ가-힣]/.test(e.key))) return HANGUL[e.code] || '';
    if (e.key && e.key.length === 1) return e.key;
    return '';
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const code = ALIAS[e.code] || e.code;
    const o = byCode[code];
    if (!o) return;
    lastUser = performance.now();
    if (!e.repeat) {
      press(o, true);
      const ch = charOf(e);
      if (ch && !e.metaKey && !e.ctrlKey && !e.altKey && !isTextTarget(e.target) && active)
        onType(ch);
    }
    // 히어로에서 스페이스는 페이지 스크롤 대신 스페이스바를 누릅니다.
    if (
      code === 'Space' &&
      active &&
      (e.target === document.body || e.target === document.documentElement)
    )
      e.preventDefault();
  };
  const onKeyUp = (e: KeyboardEvent) => {
    const o = byCode[ALIAS[e.code] || e.code];
    if (o) press(o, false);
    if (e.key === 'Meta') keys.forEach((k) => k.down && press(k, false));
  };
  const releaseAll = () => keys.forEach((k) => k.down && press(k, false));
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', releaseAll);

  const ray = new Raycaster();
  const ndc = new Vector2();
  const touching = new Map<number, KeyState>();
  function hit(e: PointerEvent): KeyState | null {
    const r = cv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const h = ray.intersectObjects(caps, false)[0];
    return h ? (h.object.userData.o as KeyState) : null;
  }
  const onDown = (e: PointerEvent) => {
    const o = hit(e);
    if (!o) return;
    lastUser = performance.now();
    touching.set(e.pointerId, o);
    press(o, true);
    const c = o.k.code;
    const ch =
      c === 'Space'
        ? ' '
        : c === 'Backspace'
          ? '\b'
          : c === 'Enter'
            ? '\n'
            : o.k.label.length === 1 && o.k.t === 'a'
              ? o.k.label.toLowerCase()
              : '';
    if (ch) onType(ch);
  };
  const onUp = (e: PointerEvent) => {
    const o = touching.get(e.pointerId);
    if (o) {
      press(o, false);
      touching.delete(e.pointerId);
    }
  };
  const hoverable = window.matchMedia('(hover: hover)').matches;
  const onHover = (e: PointerEvent) => {
    cv.style.cursor = hit(e) ? 'pointer' : '';
  };
  cv.addEventListener('pointerdown', onDown);
  cv.addEventListener('pointerup', onUp);
  cv.addEventListener('pointercancel', onUp);
  cv.addEventListener('pointerleave', onUp);
  if (hoverable) cv.addEventListener('pointermove', onHover);

  /* 쉬는 동안 살아 있는 느낌을 주는 유령 타이핑 */
  let ghostT = 0;
  let ghostQ: string[] = [];
  let wi = 0;
  const ghostTimers = new Set<ReturnType<typeof setTimeout>>();
  const queueWord = () => {
    const w = GHOST_WORDS[wi++ % GHOST_WORDS.length];
    ghostQ = ['\n', ...w.split('')];
  };
  const codeFor = (ch: string) =>
    ch === '\n' ? 'Enter' : /\d/.test(ch) ? 'Digit' + ch : 'Key' + ch.toUpperCase();

  /* ---- 루프 ---- */
  let running = false;
  let raf = 0;
  let last = performance.now();
  let active = true;
  let inView = true;
  let t = 0;
  let idleFrames = 0;
  const glowScale = () => (dark ? 1 : 0.45);

  function step(dt: number) {
    t += dt;
    let busy = false;
    for (const o of keys) {
      const target = o.down ? PRESS_DEPTH : 0;
      if (!REDUCE) {
        const a = 820 * (target - o.y) - 24 * o.v;
        o.v += a * dt;
        o.y += o.v * dt;
      }
      if (Math.abs(o.y - target) > 1e-4 || Math.abs(o.v) > 1e-3) busy = true;
      o.g.position.y = o.y;
      if (o.heat > 0 || o.down) {
        o.heat = o.down ? 1 : Math.max(0, o.heat - dt * 2.2);
        o.lm.color.copy(o.base).lerp(o.k.t === 'a' ? HOT : HOT2, o.heat);
        busy = true;
      }
    }
    glowBoost = Math.max(0, glowBoost - dt * 1.4);
    glowMat.opacity =
      (0.3 + (REDUCE ? 0 : 0.07 * Math.sin(t * 1.3)) + glowBoost * 0.45) * glowScale();
    led.material.color.setRGB(1, 0.35 + glowBoost * 0.5, 0.17 + glowBoost * 0.4);
    if (REDUCE) {
      board.rotation.copy(baseRot);
      return busy;
    }
    tilt.x += (tilt.tx - tilt.x) * Math.min(1, dt * 4);
    tilt.y += (tilt.ty - tilt.y) * Math.min(1, dt * 4);
    board.rotation.set(
      baseRot.x + tilt.x * 0.22,
      baseRot.y + tilt.y * 0.38,
      baseRot.z + 0.02 - tilt.y * 0.05,
    );
    board.position.y = Math.sin(t * 0.9) * 0.09;
    shadowMat.opacity = 0.75 - Math.sin(t * 0.9) * 0.1;
    if (performance.now() - lastUser > 6000) {
      ghostT -= dt;
      if (ghostT <= 0) {
        if (!ghostQ.length) {
          queueWord();
          ghostT = 2.6;
        } else {
          const ch = ghostQ.shift()!;
          const o = byCode[codeFor(ch)];
          if (o) {
            press(o, true);
            const id = setTimeout(() => {
              ghostTimers.delete(id);
              press(o, false);
            }, 95);
            ghostTimers.add(id);
            onType(ch);
          }
          ghostT = ch === '\n' ? 0.5 : 0.13 + Math.random() * 0.08;
        }
      }
    }
    return true;
  }
  function renderOnce() {
    renderer.render(scene, camera);
  }
  function frame(now: number) {
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;
    const busy = step(dt);
    renderOnce();
    // 모션 감소 모드: 눌림이 끝나면 루프를 멈춥니다.
    idleFrames = busy ? 0 : idleFrames + 1;
    if (REDUCE && idleFrames > 2) {
      running = false;
      return;
    }
    if (running) raf = requestAnimationFrame(frame);
  }
  const canRun = () => active && inView && !document.hidden;
  function play() {
    if (running || !canRun()) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }
  function kick() {
    if (!running) play();
  }
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);
  const io = new IntersectionObserver(
    (es) => {
      inView = es[0].isIntersecting;
      if (inView) play();
      else pause();
    },
    { threshold: 0.02 },
  );
  io.observe(host);

  if (REDUCE) {
    ['KeyS', 'KeyU', 'KeyR', 'KeyF'].forEach((c) => {
      const o = byCode[c];
      if (!o) return;
      o.y = PRESS_DEPTH;
      o.g.position.y = o.y;
      o.lm.color.copy(HOT);
    });
  }
  step(0);
  renderOnce();
  opts.onReady?.();
  lastUser = performance.now() - 4800;
  if (!REDUCE) play();

  return {
    setActive(next: boolean) {
      active = next;
      if (!next) {
        releaseAll();
        pause();
      } else {
        lastUser = performance.now() - 4800;
        play();
      }
    },
    setDark(next: boolean) {
      dark = next;
      if (!running) {
        step(0);
        renderOnce();
      }
    },
    dispose() {
      pause();
      ro.disconnect();
      io.disconnect();
      ghostTimers.forEach((id) => clearTimeout(id));
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', releaseAll);
      document.removeEventListener('visibilitychange', onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      cv.remove();
    },
  };
}
