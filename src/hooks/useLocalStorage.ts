import { useState, useEffect, useRef } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const hasLoadedRef = useRef(false);

  // Read from localStorage on client-side mount.
  // We do this in effect because localStorage is not available on server-side.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    // We use this ref to avoid writing to localStorage on the initial render.
    // Because initial render is used for reading the value from localStorage.
    // If we write to localStorage on initial render, we might overwrite the value we just read
    if (hasLoadedRef.current) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
    hasLoadedRef.current = true;
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
