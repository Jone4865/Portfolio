import { choseong, fuzzy, search } from './fuzzy';

describe('palette fuzzy search', () => {
  it('extracts the initial consonant of a Hangul syllable', () => {
    expect(choseong('방')).toBe('ㅂ');
    expect(choseong('a')).toBe('a');
  });

  it('matches by choseong and by subsequence', () => {
    expect(fuzzy('ㅂㅂㅅ', '방배사')).not.toBeNull();
    expect(fuzzy('hrs', 'HR System')).not.toBeNull();
    expect(fuzzy('zz', 'HR System')).toBeNull();
  });

  it('ranks title matches before keyword-only matches', () => {
    const items = [
      { title: 'Saleser', kw: 'vue typescript' },
      { title: 'Vue Notes', kw: '' },
    ];
    const res = search(items, 'vue');
    expect(res.map((r) => r.item.title)).toEqual(['Vue Notes', 'Saleser']);
  });
});
