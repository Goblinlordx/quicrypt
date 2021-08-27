import React, { useEffect, useState } from "react";
import { History } from "history";
import { match, useLocation, useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import { useDecrypt } from "./crypto";

const useQuery = () => new URLSearchParams(useLocation().search);

const withQueryReset = (
  fn: any,
  history: History<unknown>,
  match: match<{}>
) => {
  const { path } = match;
  return (...args: any[]) => {
    history.replace(path, { query: {} });
    return fn(...args);
  };
};

export const DecryptView = () => {
  const queryCt = useQuery().get("ct");
  const history = useHistory();
  const match = useRouteMatch();

  const [ct, _setCt] = useState(decodeURIComponent(queryCt || ""));
  const setCt = withQueryReset(_setCt, history, match);

  const [password, setPassword] = useState("");
  const [pt, err] = useDecrypt(password, ct);

  useEffect(() => {
    if (!queryCt || ct === queryCt) return;
    _setCt(decodeURIComponent(queryCt));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCt]);


  return (
    <>
      <label>
        <span>CipherText: </span>
        <textarea onInput={(e) => setCt(e.currentTarget.value)} value={ct} />
      </label>
      <label>
        <span>Password: </span>
        <textarea
          onInput={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
      </label>
      <label>
        <span>PlainText: </span>
        <textarea style={{ height: 300 }} disabled value={pt}></textarea>
      </label>
      <div>{err?.message}</div>
    </>
  );
};
