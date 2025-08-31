import { useState, useEffect, useRef } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const hasLoadedRef = useRef(false);

  // Read from localStorage only after mount.
  // If we did this in useState's initializer (even with `window` guards),
  // the server-rendered HTML could differ from the client’s initial render in the browser,
  // causing hydration issues.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }

    return () => {
      // We need this here in case the key changes.
      // Otherwise, if the key changes, in the second useEffect we might
      // write to the new key old value from the previous key.
      hasLoadedRef.current = false;
    };
  }, [key]);

  useEffect(() => {
    // We use this ref to avoid writing to localStorage on the initial render.
    // Because initial render is used for reading the value from localStorage.
    // If we write to localStorage on initial render, we might overwrite the value we just read.
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
