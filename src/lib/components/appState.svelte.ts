import type { ColorFormat } from '$lib/color';
import type { ColorSortDirection, ColorSortField } from '$lib/colors';
import { localStorageGetItem, localStorageSetItem } from '$lib/localStorage';

export type AppState = {
  format: ColorFormat;
  sortField: ColorSortField;
  sortDirection: ColorSortDirection;
};

const localStorageKey = (key: string) => {
  return `color-preview-${key}`;
};

const appState = $state<AppState>({
  format: (localStorageGetItem(localStorageKey('format')) as ColorFormat) || 'rgb-hex',
  sortField: (localStorageGetItem(localStorageKey('sortField')) as ColorSortField) || 'original',
  sortDirection:
    (localStorageGetItem(localStorageKey('sortDirection')) as ColorSortDirection) || 'asc'
});

export const setFormat = (format: ColorFormat) => {
  appState.format = format;
  localStorageSetItem(localStorageKey('format'), format);
};

export const getFormat = () => {
  return appState.format;
};

export const getSortField = () => {
  return appState.sortField;
};

export const getSortDirection = () => {
  return appState.sortDirection;
};

export const setSort = (field: ColorSortField, direction: ColorSortDirection) => {
  appState.sortField = field;
  appState.sortDirection = direction;
  localStorageSetItem(localStorageKey('sortField'), field);
  localStorageSetItem(localStorageKey('sortDirection'), direction);
};
