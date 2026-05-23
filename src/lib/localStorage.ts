export const localStorageGetItem = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    console.warn('No access to localStorage');
  }
};

export const localStorageSetItem = (key: string, value: string) => {
  try {
    return window.localStorage.setItem(key, value);
  } catch {
    console.warn('No access to localStorage');
  }
};

export const localStorageRemoveItem = (key: string) => {
  try {
    return window.localStorage.removeItem(key);
  } catch {
    console.warn('No access to localStorage');
  }
};
