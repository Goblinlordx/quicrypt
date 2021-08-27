import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEncrypt } from "./crypto";

export const EncryptView = () => {
  const [pt, setPt] = useState("");
  const [password, setPassword] = useState("");
  const ct = useEncrypt(password, pt);

  const decryptPath = `/decrypt?ct=${encodeURIComponent(ct)}`

  return (
    <>
      <label>
        <span>PlainText: </span>
        <textarea
          style={{ height: 300 }}
          onInput={(e) => setPt(e.currentTarget.value)}
        ></textarea>
      </label>
      <label>
        <span>Password: </span>
        <textarea
          onInput={(e) => setPassword(e.currentTarget.value)}
        ></textarea>
      </label>
      <label>
        <span>CipherText: </span>
        <textarea disabled value={ct}></textarea>
      </label>
      <Link to={decryptPath}>Decryption link</Link>
    </>
  );
};
