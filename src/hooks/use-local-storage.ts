import * as React from "react";
import { getEncryptionKey, encrypt, decrypt, encryptKey } from "../lib/crypto";

const isBrowser = typeof window !== "undefined";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const encryptionKey = React.useMemo(
    () => (isBrowser ? getEncryptionKey() : null),
    []
  );

  React.useEffect(() => {
    setStoredValue(getValue());
  }, []);

  const getValue = React.useCallback(() => {
    const encryptedKey = encryptKey(key);
    const item = localStorage.getItem(encryptedKey);
    if (item && encryptionKey) {
      const decryptedItem = decrypt(item, encryptionKey);
      return JSON.parse(decryptedItem);
    } else if (initialValue) {
      return initialValue;
    }
    return undefined;
  }, [encryptionKey, initialValue, key]);

  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (!isBrowser) {
      return initialValue ?? undefined;
    }
    try {
      return getValue();
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value: T | ((val: T) => T)) => {
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
        console.error(error);
      }
    },
    [key, storedValue, encryptionKey]
  );

  return [storedValue, setValue] as const;
};
