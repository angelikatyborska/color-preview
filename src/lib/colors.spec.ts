import { describe, it, expect } from 'vitest';
import { sortColors } from './colors';
import { parseColorString } from './color';

const whiteTransparent = parseColorString('#ffffffcc', 1);
const coffeeTransparent = parseColorString('#C0FFEE35', 2);
const blue = parseColorString('#3333FF', 3);
const yellow = parseColorString('#ddff00', 4);

if (whiteTransparent.status !== 'ok') throw new Error('Expected white to parse ok');
if (coffeeTransparent.status !== 'ok') throw new Error('Expected coffee to parse ok');
if (blue.status !== 'ok') throw new Error('Expected blue to parse ok');
if (yellow.status !== 'ok') throw new Error('Expected yellow to parse ok');

const input = [whiteTransparent, coffeeTransparent, blue, yellow];

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
