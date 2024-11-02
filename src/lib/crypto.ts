import { env } from "@/env";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
  Encoding,
} from "crypto";

const ENCRYPTION_KEY = env.NEXT_PUBLIC_ENCRYPTION_KEY;

const key = createHash("sha256").update(ENCRYPTION_KEY).digest();

const ALGORITHM = "aes-256-cbc";

const ENCODING_OUTPUT = "base64" as Encoding;

const ENCODING_INPUT = "utf-8" as Encoding;

const IV_LENGTH = 16;

export const encrypt = (value: string): string => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(value, ENCODING_INPUT, ENCODING_OUTPUT);
  encrypted += cipher.final(ENCODING_OUTPUT);

  return iv.toString(ENCODING_OUTPUT) + ":" + encrypted;
};

export const decrypt = (value: string): string => {
  const [ivString, encryptedData] = value.split(":");

  if (!ivString || !encryptedData) {
    return "";
  }

  const iv = Buffer.from(ivString, ENCODING_OUTPUT);
  const decipher = createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(
    encryptedData,
    ENCODING_OUTPUT,
    ENCODING_INPUT
  );
  decrypted += decipher.final(ENCODING_INPUT);

  return decrypted;
};

export const encryptKey = (key: string): string => {
  return createHash("sha256").update(key).digest("hex");
};
