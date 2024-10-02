import { env } from "@/env";
import CryptoJS from "crypto-js";

export const getEncryptionKey = (): string => {
  const ENCRYPTION_KEY = env.NEXT_PUBLIC_ENCRYPTION_KEY;

  console.log("ENCRYPTION_KEY", ENCRYPTION_KEY);

  if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY not found in .env file");
  }

  return ENCRYPTION_KEY;
};

export const encrypt = (value: string, key: string): string => {
  return CryptoJS.AES.encrypt(value, key).toString();
};

export const decrypt = (value: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(value, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString();
};
