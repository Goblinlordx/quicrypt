import React from "react";

import "tailwindcss/tailwind.css"
import "./App.css";

import { Redirect } from "react-router";
import { Switch, Route, Link } from "react-router-dom";

import { DecryptView } from "./DecryptView";
import { EncryptView } from "./EncryptView";
import { AboutView } from "./AboutView";

function App() {
  return (
    <div className="min-h-screen bg-indigo-100">
      <div>
        <div>Quicrypt</div>
        <div>
          <Link to="/encrypt">Encrypt</Link>
        </div>
        <div>
          <Link to="/decrypt">Decrypt</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
      </div>
      <header className="App-header">
        <Switch>
          <Route path="/encrypt" component={EncryptView} />
          <Route path="/decrypt" component={DecryptView} />
          <Route path="/about" component={AboutView} />
          <Redirect to="/encrypt" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
