import Color, { type ColorInstance } from 'color';

export type ColorFormat = 'rgb' | 'rgb-hex' | 'hsl' | 'hsv' | 'hwb';

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

const format = (x: number) => {
  return Math.round(x * 100) / 100;
};

export const getOriginalString = (color: ParsedColor) => {
  return color.originalString;
};

export const toHex = (color: ParsedColorOk) => {
  if (color.colorInstance.alpha() === 1) {
    return color.colorInstance.hex();
  } else {
    return color.colorInstance.hexa();
  }
};

export const toRgb = (color: ParsedColorOk) => {
  const components = color.colorInstance.rgb().array();
  if (components.length === 3) {
    return `rgb(${format(components[0])} ${format(components[1])} ${format(components[2])})`;
  } else {
    return `rgb(${format(components[0])} ${format(components[1])} ${format(components[2])} / ${format(components[3])})`;
  }
};

export const toHsl = (color: ParsedColorOk) => {
  const components = color.colorInstance.hsl().array();
  if (components.length === 3) {
    return `hsl(${format(components[0])} ${format(components[1])}% ${format(components[2])}%)`;
  } else {
    return `hsl(${format(components[0])} ${format(components[1])}% ${format(components[2])}% / ${format(components[3])})`;
  }
};

export const toHwb = (color: ParsedColorOk) => {
  const components = color.colorInstance.hwb().array();
  if (components.length === 3) {
    return `hwb(${format(components[0])} ${format(components[1])}% ${format(components[2])}%)`;
  } else {
    return `hwb(${format(components[0])} ${format(components[1])}% ${format(components[2])}% / ${format(components[3])})`;
  }
};

export const getWhiteness = (color: ParsedColorOk) => {
  return format(color.colorInstance.white());
};

export const getBlackness = (color: ParsedColorOk) => {
  return format(color.colorInstance.wblack());
};

export const getRed = (color: ParsedColorOk) => {
  return format(color.colorInstance.red());
};

export const getGreen = (color: ParsedColorOk) => {
  return format(color.colorInstance.green());
};

export const getBlue = (color: ParsedColorOk) => {
  return format(color.colorInstance.blue());
};

export const getHue = (color: ParsedColorOk) => {
  return format(color.colorInstance.hue());
};

export const getSaturation = (color: ParsedColorOk) => {
  return format(color.colorInstance.saturationl());
};

export const getLightness = (color: ParsedColorOk) => {
  return format(color.colorInstance.lightness());
};

export const getAlpha = (color: ParsedColorOk) => {
  return format(color.colorInstance.alpha());
};
