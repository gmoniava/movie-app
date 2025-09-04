import { useState, useEffect, useRef } from "react";

// https://stackoverflow.com/questions/72961647/how-to-implement-a-uselocalstorage-hook-in-next-js
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const hasLoadedRef = useRef(false);

  // Read from localStorage only after mount.
  // If we did this in useState's initializer (even with `window` guards),
  // the server-rendered HTML could differ from the client’s initial render in the browser,
  // causing hydration issues.
  // Besides calling localStorage.getItem is a side effect which is not okay in initializer function.
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
      // Reset the mounted flag when key changes, so that the next effect
      // doesn't accidentally write an old value under the new key.
      hasLoadedRef.current = false;
    };
  }, [key]);

  useEffect(() => {
    // Skip writing on the very first render (when we're still reading from localStorage).
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
