import { Redirect, Route, Switch } from "react-router";
import { AboutView } from "./AboutView";
import { DecryptView } from "./DecryptView";
import { EncryptView } from "./EncryptView";

export const Routing = () => (
  <Switch>
    <Route path="/encrypt" component={EncryptView} />
    <Route path="/decrypt" component={DecryptView} />
    <Route path="/about" component={AboutView} />
    <Redirect to="/encrypt" />
  </Switch>
);
