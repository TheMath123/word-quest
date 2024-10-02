import * as React from "react";
import { getEncryptionKey, encrypt, decrypt, encryptKey } from "../lib/crypto";

const isBrowser = typeof window !== "undefined";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void];
export function useLocalStorage<T = undefined>(
  key: string
): [T | undefined, (value: T | ((val: T | undefined) => T)) => void];

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const encryptionKey = React.useMemo(
    () => (isBrowser ? getEncryptionKey() : null),
    []
  );

  const getValue = React.useCallback(() => {
    if (!isBrowser || !encryptionKey) return initialValue;

    const encryptedKey = encryptKey(key);
    const item = localStorage.getItem(encryptedKey);

    if (item) {
      try {
        const decryptedItem = decrypt(item, encryptionKey);
        return JSON.parse(decryptedItem);
      } catch (error) {
        console.error("Error parsing stored item:", error);
        return initialValue;
      }
    }

    return initialValue;
  }, [encryptionKey, initialValue, key]);

  const [storedValue, setStoredValue] = React.useState<T | undefined>(() => {
    try {
      return getValue();
    } catch (error) {
      console.error("Error getting initial value:", error);
      return initialValue;
    }
  });

  React.useEffect(() => {
    setStoredValue(getValue());
  }, []);

  const setValue = React.useCallback(
    (value: T | ((val: T | undefined) => T)) => {
      if (!isBrowser || !encryptionKey) return;
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        const encryptedKey = encryptKey(key);
        const encryptedValue = encrypt(
          JSON.stringify(valueToStore),
          encryptionKey
        );
        localStorage.setItem(encryptedKey, encryptedValue);
      } catch (error) {
        console.error("Error setting value:", error);
      }
    },
    [key, storedValue, encryptionKey]
  );

  return [storedValue, setValue] as const;
}
