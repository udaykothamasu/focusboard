import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Failed to write localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}