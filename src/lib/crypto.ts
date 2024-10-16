import { env } from "@/env";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = env.NEXT_PUBLIC_ENCRYPTION_KEY;

export const encrypt = (value: string): string => {
  return CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
};

export const decrypt = (value: string): string => {
  const bytes = CryptoJS.AES.decrypt(value, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString();
};
