import { describe, it, expect } from 'vitest';
import {
  parseColorString,
  getOriginalString,
  getHex,
  getRed,
  getGreen,
  getBlue,
  getHue,
  getSaturation,
  getLightness,
  getAlpha
} from './color';

describe('color', () => {
  const red = parseColorString('red');
  const semiTransparentBlue = parseColorString('rgba(0, 0, 255, 0.5)');
  const hslColor = parseColorString('hsl(120, 50%, 40%)');

  if (red.status !== 'ok') throw new Error('Expected red to parse ok');
  if (semiTransparentBlue.status !== 'ok')
    throw new Error('Expected semiTransparentBlue to parse ok');
  if (hslColor.status !== 'ok') throw new Error('Expected hslColor to parse ok');

  describe('parseColorString', () => {
    it('parses a valid color and returns status ok', () => {
      const result = parseColorString('blue');
      expect(result.status).toBe('ok');
    });

    it('returns status error for an invalid color string', () => {
      const result = parseColorString('notacolor');
      expect(result.status).toBe('error');
    });

    it('returns status error for an empty string', () => {
      const result = parseColorString('');
      expect(result.status).toBe('error');
    });

    it('normalizes the original string to lowercase and trimmed', () => {
      const result = parseColorString('  RED  ');
      expect(result.originalString).toBe('red');
    });
  });

  describe('getOriginalString', () => {
    it('returns the original string for a valid color', () => {
      expect(getOriginalString(red)).toBe('red');
    });

    it('returns the original string for an error color', () => {
      const result = parseColorString('xyz');
      expect(getOriginalString(result)).toBe('xyz');
    });
  });

  describe('getHex', () => {
    it('returns a hex string for an opaque color', () => {
      expect(getHex(red)).toBe('#FF0000');
    });

    it('returns a hexa string for a semi-transparent color', () => {
      expect(getHex(semiTransparentBlue)).toMatch(/^#[0-9A-Fa-f]{8}$/);
    });
  });

  describe('getRed', () => {
    it('returns 255 for red', () => {
      expect(getRed(red)).toBe(255);
    });

    it('returns 0 for blue', () => {
      const blue = parseColorString('blue');
      if (blue.status !== 'ok') throw new Error();
      expect(getRed(blue)).toBe(0);
    });
  });

  describe('getGreen', () => {
    it('returns 0 for red', () => {
      expect(getGreen(red)).toBe(0);
    });

    it('returns 128 for green (CSS "green")', () => {
      const green = parseColorString('green');
      if (green.status !== 'ok') throw new Error();
      expect(getGreen(green)).toBe(128);
    });
  });

  describe('getBlue', () => {
    it('returns 0 for red', () => {
      expect(getBlue(red)).toBe(0);
    });

    it('returns 255 for blue', () => {
      const blue = parseColorString('blue');
      if (blue.status !== 'ok') throw new Error();
      expect(getBlue(blue)).toBe(255);
    });
  });

  describe('getHue', () => {
    it('returns 0 for red', () => {
      expect(getHue(red)).toBe(0);
    });

    it('returns 120 for hsl(120, 50%, 40%)', () => {
      expect(getHue(hslColor)).toBe(120);
    });
  });

  describe('getSaturation', () => {
    it('returns 100 for pure red', () => {
      expect(getSaturation(red)).toBe(100);
    });

    it('returns 50 for hsl(120, 50%, 40%)', () => {
      expect(getSaturation(hslColor)).toBe(50);
    });
  });

  describe('getLightness', () => {
    it('returns 50 for pure red', () => {
      expect(getLightness(red)).toBe(50);
    });

    it('returns 40 for hsl(120, 50%, 40%)', () => {
      expect(getLightness(hslColor)).toBe(40);
    });
  });

  describe('getAlpha', () => {
    it('returns 1 for an opaque color', () => {
      expect(getAlpha(red)).toBe(1);
    });

    it('returns 0.5 for rgba(0, 0, 255, 0.5)', () => {
      expect(getAlpha(semiTransparentBlue)).toBe(0.5);
    });
  });
});
