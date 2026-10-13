/** 한글 초성 + 영문 부분열(subsequence) 검색 — 명령 팔레트용 */
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';

export function choseong(c: string) {
  const k = c.charCodeAt(0) - 0xac00;
  return k >= 0 && k < 11172 ? CHO[Math.floor(k / 588)] : c;
}

export type FuzzyMatch = { idx: number[]; score: number };

/** q의 글자가 text 안에 순서대로 나오면 매치 — 연속·첫 글자 매치에 가산점 */
export function fuzzy(query: string, text: string): FuzzyMatch | null {
  const q = query.toLowerCase().replace(/\s+/g, '');
  if (!q) return { idx: [], score: 0 };
  const t = text.toLowerCase();
  const idx: number[] = [];
  let qi = 0;
  let score = 0;
  let prev = -2;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    const c = t[i];
    if (c === q[qi] || choseong(c) === q[qi]) {
      idx.push(i);
      score += (i === prev + 1 ? 3 : 1) + (i === 0 ? 2 : 0);
      prev = i;
      qi++;
    }
  }
  return qi === q.length ? { idx, score } : null;
}

export type Searchable = { title: string; kw: string };

/** 제목 매치를 우선하고, 키워드는 충분히 촘촘하게 맞을 때만 포함합니다. */
export function search<T extends Searchable>(items: T[], query: string) {
  const q = query.toLowerCase().replace(/\s+/g, '');
  if (!q) return items.map((item) => ({ item, idx: [] as number[], score: 0 }));
  const out: { item: T; idx: number[]; score: number }[] = [];
  items.forEach((item) => {
    const m = fuzzy(q, item.title);
    if (m) {
      out.push({ item, idx: m.idx, score: m.score + 10 });
      return;
    }
    const k = fuzzy(q, item.kw);
    if (k && k.score >= q.length * 2 - 1) out.push({ item, idx: [], score: k.score });
  });
  return out.sort((a, b) => b.score - a.score);
}
