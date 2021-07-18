import { calculateAspectRatio } from '../src/util';

describe('calculateAspectRatio', () => {
  it('accepts numerical ratios', () => {
    expect(calculateAspectRatio(16 / 9)).toEqual(56.25);
    expect(calculateAspectRatio(4 / 3)).toEqual(75);
  });

  it('accepts string ratios, given they are delimited by "x" or ":"', () => {
    expect(calculateAspectRatio('16x9')).toEqual(56.25);
    expect(calculateAspectRatio('16:9')).toEqual(56.25);
    expect(() => calculateAspectRatio('16&9')).toThrow();
  });
});
