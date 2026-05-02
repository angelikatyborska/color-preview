import Color, { type ColorInstance } from 'color';

export type ParsedColor = ParsedColorOk | ParsedColorError;

export type ParsedColorOk = {
  originalString: string;
  colorInstance: ColorInstance;
  status: 'ok';
};

export type ParsedColorError = {
  originalString: string;
  colorInstance: null;
  status: 'error';
};

export const parseColorString = (string: string): ParsedColor => {
  const normalized = string.trim().toLowerCase();

  if (normalized) {
    try {
      const colorInstance = Color(normalized);
      return {
        originalString: normalized,
        colorInstance,
        status: 'ok'
      };
    } catch {
      // do nothing, the below return will handle it
    }
  }

  return {
    originalString: normalized,
    colorInstance: null,
    status: 'error'
  };
};

export const getOriginalString = (color: ParsedColor) => {
  return color.originalString;
};

export const getHex = (color: ParsedColorOk) => {
  if (color.colorInstance.alpha() === 1) {
    return color.colorInstance.hex();
  } else {
    return color.colorInstance.hexa();
  }
};

export const getRed = (color: ParsedColorOk) => {
  return color.colorInstance.red();
};

export const getGreen = (color: ParsedColorOk) => {
  return color.colorInstance.green();
};

export const getBlue = (color: ParsedColorOk) => {
  return color.colorInstance.blue();
};

export const getHue = (color: ParsedColorOk) => {
  return color.colorInstance.hue();
};

export const getSaturation = (color: ParsedColorOk) => {
  return color.colorInstance.saturationl();
};

export const getLightness = (color: ParsedColorOk) => {
  return color.colorInstance.lightness();
};

export const getAlpha = (color: ParsedColorOk) => {
  return color.colorInstance.alpha();
};
