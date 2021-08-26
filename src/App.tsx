import React, { useState } from 'react';
import './App.css';
import { useDecrypt, useEncrypt } from './crypto';

function App() {
  const [pt, setPt] = useState("");
  const [password, setPassword] = useState("");
  const ct = useEncrypt(password, pt)

  const [ct2, setCt2] = useState("");
  const [password2, setPassword2] = useState("");
  const [pt2, err] = useDecrypt(password2, ct2)


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <textarea onInput={(e) => setPt(e.currentTarget.value)}></textarea>
          <textarea
            onInput={(e) => setPassword(e.currentTarget.value)}
          ></textarea>
          <textarea disabled value={ct}></textarea>
        </div>
        <hr />
        <div>
          <textarea onInput={(e) => setCt2(e.currentTarget.value)}></textarea>
          <textarea
            onInput={(e) => setPassword2(e.currentTarget.value)}
          ></textarea>
          <textarea disabled value={pt2}></textarea>
          <div>{err?.message}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
