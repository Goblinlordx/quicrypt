import React from "react";
import "./App.css";

import { Redirect } from "react-router";
import { Switch, Route } from "react-router-dom";

import { DecryptView } from "./DecryptView";
import { EncryptView } from "./EncryptView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/encrypt" component={EncryptView} />
          <Route path="/decrypt" component={DecryptView} />
          <Route path="/about" component={EncryptView} />
          <Redirect to="/encrypt" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
