import { describe, it, expect } from 'vitest';
import { markDuplicates, sortColors } from './colors';
import { parseColorString } from './color';

const whiteTransparent = parseColorString('#ffffffcc', 0);
const coffeeTransparent = parseColorString('#C0FFEE35', 1);
const blue = parseColorString('#3333FF', 2);
const yellow = parseColorString('#ddff00', 3);

if (whiteTransparent.status !== 'ok') throw new Error('Expected white to parse ok');
if (coffeeTransparent.status !== 'ok') throw new Error('Expected coffee to parse ok');
if (blue.status !== 'ok') throw new Error('Expected blue to parse ok');
if (yellow.status !== 'ok') throw new Error('Expected yellow to parse ok');

const input = [whiteTransparent, coffeeTransparent, blue, yellow];

describe('color', () => {
  describe('sortColors', () => {
    describe('original', () => {
      it('asc keeps original order', () => {
        expect(sortColors(input, 'original', 'asc')).toEqual([
          whiteTransparent,
          coffeeTransparent,
          blue,
          yellow
        ]);
      });

      it('desc reverts original order', () => {
        expect(sortColors(input, 'original', 'desc')).toEqual([
          yellow,
          blue,
          coffeeTransparent,
          whiteTransparent
        ]);
      });
    });

    describe('hue', () => {
      // hue: white=0, coffee=163.81, blue=240, yellow=68
      it('asc sorts by hue ascending', () => {
        expect(sortColors(input, 'hue', 'asc')).toEqual([
          whiteTransparent,
          yellow,
          coffeeTransparent,
          blue
        ]);
      });

      it('desc sorts by hue descending', () => {
        expect(sortColors(input, 'hue', 'desc')).toEqual([
          blue,
          coffeeTransparent,
          yellow,
          whiteTransparent
        ]);
      });
    });

    describe('saturation', () => {
      // saturation: white=0, coffee=100, blue=100, yellow=100
      it('asc sorts by saturation ascending', () => {
        expect(sortColors(input, 'saturation', 'asc')).toEqual([
          whiteTransparent,
          coffeeTransparent,
          blue,
          yellow
        ]);
      });

      it('desc sorts by saturation descending', () => {
        expect(sortColors(input, 'saturation', 'desc')).toEqual([
          coffeeTransparent,
          blue,
          yellow,
          whiteTransparent
        ]);
      });
    });

    describe('lightness', () => {
      // lightness: white=100, coffee=87.65, blue=60, yellow=50
      it('asc sorts by lightness ascending', () => {
        expect(sortColors(input, 'lightness', 'asc')).toEqual([
          yellow,
          blue,
          coffeeTransparent,
          whiteTransparent
        ]);
      });

      it('desc sorts by lightness descending', () => {
        expect(sortColors(input, 'lightness', 'desc')).toEqual([
          whiteTransparent,
          coffeeTransparent,
          blue,
          yellow
        ]);
      });
    });

    describe('alpha', () => {
      // alpha: white=0.8, coffee=0.21, blue=1, yellow=1
      it('asc sorts by alpha ascending', () => {
        expect(sortColors(input, 'alpha', 'asc')).toEqual([
          coffeeTransparent,
          whiteTransparent,
          blue,
          yellow
        ]);
      });

      it('desc sorts by alpha descending', () => {
        expect(sortColors(input, 'alpha', 'desc')).toEqual([
          blue,
          yellow,
          whiteTransparent,
          coffeeTransparent
        ]);
      });
    });
  });

  describe('markDuplicates', () => {
    const red = parseColorString('red', 0);
    const red2 = parseColorString('red', 1);
    const redHex = parseColorString('#ff0000', 1);
    const redHsl = parseColorString('hsl(0 100% 50%)', 2);
    const redTransparent = parseColorString('#ff0000dd', 3);

    if (red.status !== 'ok') throw new Error('Expected red to parse ok');
    if (redHex.status !== 'ok') throw new Error('Expected redHex to parse ok');
    if (redHsl.status !== 'ok') throw new Error('Expected redHsl to parse ok');
    if (redTransparent.status !== 'ok') throw new Error('Expected redTransparent to parse ok');

    it('identical colors in the same format', () => {
      const marked = markDuplicates([red, red2]);
      expect(marked[0].duplicateOf).toBeNull();
      expect(marked[1].duplicateOf).toBe(0);
    });

    it('treats colors with lower index as originals', () => {
      const marked = markDuplicates([red2, red]);
      expect(marked[0].duplicateOf).toBe(0);
      expect(marked[1].duplicateOf).toBeNull();
    });

    it('identical colors in different formats', () => {
      const marked = markDuplicates([red, redHex, redHsl]);
      expect(marked[0].duplicateOf).toBeNull();
      expect(marked[1].duplicateOf).toBe(0);
      expect(marked[2].duplicateOf).toBe(0);
    });

    it('not duplicates if they differ by alpha channel', () => {
      const marked = markDuplicates([red, redTransparent]);
      expect(marked[0].duplicateOf).toBeNull();
      expect(marked[1].duplicateOf).toBeNull();
    });

    it('completely different colors', () => {
      const marked = markDuplicates([coffeeTransparent, whiteTransparent, blue, yellow]);

      expect(marked[0].duplicateOf).toBeNull();
      expect(marked[1].duplicateOf).toBeNull();
      expect(marked[2].duplicateOf).toBeNull();
      expect(marked[3].duplicateOf).toBeNull();
    });

    it('ignores errors', () => {
      const marked = markDuplicates([red, red2, parseColorString('xxx', 2)]);

      expect(marked[0].duplicateOf).toBeNull();
      expect(marked[1].duplicateOf).toBe(0);
      expect(marked[2].duplicateOf).toBeNull();
    });
  });
});
