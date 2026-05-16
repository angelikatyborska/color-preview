import { getAlpha, getHue, getSaturation, getLightness, type ParsedColor } from '$lib/color';

export type ColorSortField =
  | 'original'
  | 'red'
  | 'green'
  | 'blue'
  | 'hue'
  | 'saturation'
  | 'lightness'
  | 'alpha';

export type ColorSortDirection = 'asc' | 'desc';

const getSortFunction = (field: ColorSortField) => {
  switch (field) {
    case 'hue':
      return getHue;
    case 'saturation':
      return getSaturation;
    case 'lightness':
      return getLightness;
    case 'alpha':
      return getAlpha;
    default:
      return null;
  }
};

export function sortColors(
  colors: ParsedColor[],
  field: ColorSortField,
  direction: ColorSortDirection
) {
  const sortFunction = getSortFunction(field);
  // if no chosen sorting, keep original order
  if (!sortFunction) {
    if (direction === 'asc') {
      return [...colors];
    } else {
      return colors.toReversed();
    }
  }

  return colors.toSorted((c1, c2) => {
    // arbitrary big value to put the invalid colors last
    const emptyValue = direction === 'asc' ? 1000 : -1000;
    const c1Value = c1.status === 'ok' ? sortFunction(c1) : emptyValue;
    const c2Value = c2.status === 'ok' ? sortFunction(c2) : emptyValue;
    return direction === 'asc' ? c1Value - c2Value : c2Value - c1Value;
  });
}
