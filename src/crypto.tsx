import { useEffect, useState } from "react";

const BLOCK_BYTE_SIZE = 8;

const bufToAlpha = (buf: ArrayBuffer) => {
  const arr = Array.from(new Uint8Array(buf));
  const padSize = Math.abs((arr.length % BLOCK_BYTE_SIZE) - BLOCK_BYTE_SIZE)
  const paddedArr = arr.concat(new Array(padSize).fill(padSize))
  const str = paddedArr.map((byte) => String.fromCharCode(byte)).join("")
  return btoa(str);
};

const alphaToBuf = (str: string) => {
  const paddedArr = atob(str).split("")
  const padSize = paddedArr[paddedArr.length - 1].charCodeAt(0)
  const isPadded = padSize > 0 && padSize < BLOCK_BYTE_SIZE;
  const arr = isPadded
    ? paddedArr.slice(0, paddedArr.length - padSize)
    : paddedArr;

  return new Uint8Array(arr.map((ch) => ch.charCodeAt(0)));
}

const encrypt = async (password: string, pt: string) => {
  const pwHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password.trim())
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };

  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);

  const ctBuf = await crypto.subtle.encrypt(
    alg,
    key,
    new TextEncoder().encode(pt)
  );

  const ivStr = bufToAlpha(iv);
  const ctStr = bufToAlpha(ctBuf);

  return `${ivStr}$${ctStr}`;
};

const decrypt = async (password: string, ctRaw: string): Promise<[string, null | Error]>  => {
  try {
    const pwUtf8 = new TextEncoder().encode(password.trim());
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

    const [ivStr = "", ctStr = ""] = ctRaw.split("$");
    const iv = alphaToBuf(ivStr);
    const ct = alphaToBuf(ctStr);

    const alg = { name: "AES-GCM", iv };

    const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
      "decrypt",
    ]);

    const ptBuf = await crypto.subtle.decrypt(alg, key, ct);
    return [new TextDecoder().decode(ptBuf), null]
  } catch (err) {
    return ['', new Error('Invalid ciphertext or password')]
  }
};

export const useEncrypt = (password: string, pt: string) => {
  const [ct, setCT] = useState("");
  useEffect(() => {
    void (async () => {
      setCT(await encrypt(password, pt));
    })();
  }, [password, pt]);

  return ct;
};


export const useDecrypt = (password: string, ct: string) => {
  const [pt, setPT] = useState("");
  const [err, setErr] = useState<null | Error>(null);
  useEffect(() => {
    void (async () => {
      const [pt, err] = await decrypt(password, ct)
      setPT(pt);
      setErr(err)
    })();
  }, [password, ct]);

  return [pt, err] as [string, null | Error];
};
