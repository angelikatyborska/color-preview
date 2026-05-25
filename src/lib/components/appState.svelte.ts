import type { ColorFormat } from '$lib/color';
import type { ColorSortDirection, ColorSortField } from '$lib/colors';
import { localStorageGetItem, localStorageSetItem } from '$lib/localStorage';

export type AppState = {
  format: ColorFormat;
  sortField: ColorSortField;
  sortDirection: ColorSortDirection;
  exportDeduplicated: boolean;
  exportFormatted: boolean;
  exportSorted: boolean;
};

const localStorageKey = (key: string) => {
  return `color-preview-${key}`;
};

const appState = $state<AppState>({
  format: (localStorageGetItem(localStorageKey('format')) as ColorFormat) || 'rgb-hex',
  sortField: (localStorageGetItem(localStorageKey('sortField')) as ColorSortField) || 'original',
  sortDirection:
    (localStorageGetItem(localStorageKey('sortDirection')) as ColorSortDirection) || 'asc',
  exportDeduplicated: localStorageGetItem(localStorageKey('exportDeduplicated')) === 'true' || true,
  exportFormatted: localStorageGetItem(localStorageKey('exportFormatted')) === 'true' || true,
  exportSorted: localStorageGetItem(localStorageKey('exportSorted')) === 'true' || true
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

export const getExportDeduplicated = () => {
  return appState.exportDeduplicated;
};

export const setExportDeduplicated = (exportDeduplicated: boolean) => {
  appState.exportDeduplicated = exportDeduplicated;
  localStorageSetItem(localStorageKey('exportDeduplicated'), exportDeduplicated ? 'true' : 'false');
};

export const getExportFormatted = () => {
  return appState.exportFormatted;
};

export const setExportFormatted = (exportFormatted: boolean) => {
  appState.exportFormatted = exportFormatted;
  localStorageSetItem(localStorageKey('exportFormatted'), exportFormatted ? 'true' : 'false');
};

export const getExportSorted = () => {
  return appState.exportSorted;
};

export const setExportSorted = (exportSorted: boolean) => {
  appState.exportSorted = exportSorted;
  localStorageSetItem(localStorageKey('exportSorted'), exportSorted ? 'true' : 'false');
};
