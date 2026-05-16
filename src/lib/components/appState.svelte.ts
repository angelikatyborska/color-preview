import type { ColorFormat } from '$lib/color';
import type { ColorSortDirection, ColorSortField } from '$lib/colors';

export type AppState = {
  format: ColorFormat;
  sortField: ColorSortField;
  sortDirection: ColorSortDirection;
};

const appState = $state<AppState>({
  format: 'rgb-hex',
  sortField: 'original',
  sortDirection: 'asc'
});

export const setFormat = (format: ColorFormat) => {
  appState.format = format;
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
};
