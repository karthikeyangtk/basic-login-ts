import { localStorageConstants } from "../constants/localstorageConstants";

type StorageKey = keyof typeof localStorageConstants

/**
 * Contain helper function to avoid mulptiple scripts
 * @category helper
 * @module helper
 */

export type ValueOf<T> = T[keyof T];

/**
 * Get from localstorage
 * @param key
 */
export const getFromStorage = (key: StorageKey, defaultValue = "") => {
  try {
    const getData = localStorage.getItem(key);
    return getData === null ? defaultValue : JSON.parse(getData);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Set in local storage
 * @param key
 * @param item
 */
export const setInStorage = (key: StorageKey, item: unknown = "") => {
  if (!item) {
    localStorage.setItem(key, `${item}`);
  } else {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

/**
 * Remove from local storage
 * @param key
 */
export const removeFromStorage = (key: StorageKey) => {
  localStorage.removeItem(key);
};
