import { useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router"
import { AboutView } from "./AboutView"
import { DecryptView } from "./DecryptView"
import { EncryptView } from "./EncryptView"

const useQuery = () => new URLSearchParams(useLocation().search);

export const Routing = () => {
  const queryCt = useQuery().get("ct");

  const ct = useMemo(() => {
    console.log('run')
    return decodeURIComponent(queryCt || "")
  }, [queryCt])

  return (
    <Switch>
      <Route path="/about" component={AboutView} />
      <Route path="/" render={() => queryCt ? <DecryptView ct={ct}/> : <EncryptView/>} />
      <Redirect to="/" />
    </Switch>
  )
}
