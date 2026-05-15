import type { ColorFormat } from '$lib/color';

export type AppState = {
  format: ColorFormat;
};

const appState = $state<AppState>({
  format: 'hsl'
});

export const setFormat = (format: ColorFormat) => {
  appState.format = format;
};

export const getFormat = () => {
  return appState.format;
};
