import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEncrypt } from "./crypto";

export const EncryptView = () => {
  const [pt, setPt] = useState("");
  const [password, setPassword] = useState("");
  const ct = useEncrypt(password, pt);

  const decryptPath = `/decrypt?ct=${encodeURIComponent(ct)}`;

  return (
    <div className="flex flex-grow flex-col">
      <label className="flex flex-grow flex-col m-8">
        <div>PlainText: </div>
        <textarea
          className="input flex-grow"
          onInput={(e) => setPt(e.currentTarget.value)}
        ></textarea>
      </label>
      <label className="flex flex-col m-8">
        <div>Password: </div>
        <textarea
          className="input"
          onInput={(e) => setPassword(e.currentTarget.value)}
        ></textarea>
      </label>
      <label className="flex flex-col m-8">
        <div>CipherText: </div>
        <textarea className="input" disabled value={ct}></textarea>
      </label>
      <Link to={decryptPath}>Decryption link</Link>
    </div>
  );
};
