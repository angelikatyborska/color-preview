import Color, { type ColorInstance } from 'color';

export type ColorFormat = 'rgb' | 'rgb-hex' | 'hsl' | 'hsv' | 'hwb';

export type ParsedColor = ParsedColorOk | ParsedColorError;

export type ParsedColorOk = {
  originalString: string;
  colorInstance: ColorInstance;
  status: 'ok';
  originalIndex: number;
  duplicateOf?: number | null;
};

export type ParsedColorError = {
  originalString: string;
  colorInstance: null;
  status: 'error';
  originalIndex: number;
  duplicateOf?: number | null;
};

const alphaPrecision = 2;

export const parseColorString = (string: string, index: number): ParsedColor => {
  const normalized = string.trim();

  if (normalized) {
    try {
      const colorInstance = Color(normalized);
      return {
        originalString: normalized,
        colorInstance,
        status: 'ok',
        originalIndex: index
      };
    } catch {
      // do nothing, the below return will handle it
    }
  }

  return {
    originalString: normalized,
    colorInstance: null,
    status: 'error',
    originalIndex: index
  };
};

const format = (x: number, precision: number = 0) => {
  return Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);
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
    return `rgb(${format(components[0])} ${format(components[1])} ${format(components[2])} / ${format(components[3], alphaPrecision)})`;
  }
};

export const toHsl = (color: ParsedColorOk) => {
  const components = color.colorInstance.hsl().array();
  if (components.length === 3) {
    return `hsl(${format(components[0])} ${format(components[1])}% ${format(components[2])}%)`;
  } else {
    return `hsl(${format(components[0])} ${format(components[1])}% ${format(components[2])}% / ${format(components[3], alphaPrecision)})`;
  }
};

export const toHwb = (color: ParsedColorOk) => {
  const components = color.colorInstance.hwb().array();
  if (components.length === 3) {
    return `hwb(${format(components[0])} ${format(components[1])}% ${format(components[2])}%)`;
  } else {
    return `hwb(${format(components[0])} ${format(components[1])}% ${format(components[2])}% / ${format(components[3], alphaPrecision)})`;
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
  return format(color.colorInstance.alpha(), alphaPrecision);
};

export const formatColor = (color: ParsedColor, format: ColorFormat) => {
  if (color.status === 'ok') {
    switch (format) {
      case 'rgb':
        return toRgb(color);
      case 'rgb-hex':
        return toHex(color);
      case 'hsl':
        return toHsl(color);
      case 'hwb':
        return toHwb(color);
    }
  }

  return null;
};
