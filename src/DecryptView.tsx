import { useEffect, useState } from "react";
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
    <div className="flex flex-grow flex-col m-4">
      <label className="flex flex-col m-4">
        <div>CipherText: </div>
        <textarea
          className="input"
          onInput={(e) => setCt(e.currentTarget.value)}
          value={ct}
        />
      </label>
      <label className="flex flex-col m-4">
        <div>Password: </div>
        <textarea
          className="input"
          onInput={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
      </label>
      <label className="flex flex-col flex-grow m-4">
        <div>PlainText: </div>
        {!err && (
          <textarea
            className="input flex-grow h-20 bg-green-200 bg-opacity-100"
            disabled
            value={pt}
          />
        )}
        {err && (
          <div className="input flex-grow content-center justify-center bg-red-500">
            {err?.message}
          </div>
        )}
      </label>
    </div>
  );
};
