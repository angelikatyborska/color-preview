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

export const getOriginalString = (color: ParsedColor) => {
  return color.originalString;
};

export const getRgb = (color: ParsedColorOk) => {
  const components = color.colorInstance.rgb().array();
  if (components.length === 3) {
    return `rgb(${components[0]} ${components[1]} ${components[2]})`;
  } else {
    return `rgb(${components[0]} ${components[1]} ${components[2]} / ${components[3]})`;
  }
};

export const getHsl = (color: ParsedColorOk) => {
  const components = color.colorInstance.hsl().array();
  if (components.length === 3) {
    return `hsl(${components[0]} ${components[1]}% ${components[2]}%)`;
  } else {
    return `hsl(${components[0]} ${components[1]}% ${components[2]}% / ${components[3]})`;
  }
};

export const getHwb = (color: ParsedColorOk) => {
  const components = color.colorInstance.hwb().array();
  if (components.length === 3) {
    return `hwb(${components[0]} ${components[1]}% ${components[2]}%)`;
  } else {
    return `hwb(${components[0]} ${components[1]}% ${components[2]}% / ${components[3]})`;
  }
};

export const getWhiteness = (color: ParsedColorOk) => {
  return color.colorInstance.white();
};

export const getBlackness = (color: ParsedColorOk) => {
  return color.colorInstance.wblack();
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
