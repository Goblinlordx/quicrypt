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
      <textarea onInput={(e) => setPt(e.currentTarget.value)}></textarea>
      <textarea onInput={(e) => setPassword(e.currentTarget.value)}></textarea>
      <textarea disabled value={ct}></textarea>
      <Link to={decryptPath}>URL</Link>
    </>
  );
};
