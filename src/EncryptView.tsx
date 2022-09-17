import React, { useState } from "react"
import { Link } from "react-router-dom"
import { encrypt, useEncrypt } from "./crypto"
import { toClipboard } from "./toClipboard"

enum FormState {
  MESSAGE = 0,
  PASSPHRASE,
  CT,
}

export const EncryptView = () => {
  const [state, setState] = useState<FormState>(FormState.MESSAGE)
  const [pt, setPt] = useState("")
  const [password, setPassword] = useState("")
  const [ct, setCt] = useState("")

  const formContinue = async (e: any) => {
    e.preventDefault()
    if (state === FormState.MESSAGE) {
      setState(FormState.PASSPHRASE)
    } else if (state === FormState.PASSPHRASE) {
      const ct = await encrypt(password, pt)
      setCt(ct)
      setState(FormState.CT)
    } else if (state === FormState.CT) {
      setPt("")
      setPassword("")
      setCt("")
      setState(FormState.MESSAGE)
    }
  }

  const backToMessage = () => {
    setState(FormState.MESSAGE)
    setPassword("")
  }

  const splitUrl = window.location.href.split("#")
  const decryptPath = `${
    splitUrl.length > 1 ? splitUrl[0] : ""
  }#/?ct=${encodeURIComponent(ct)}`

  const copyUrl = async () => {
    const ta = document.createElement("textarea")
    ta.value = decryptPath
    console.log('decryption URL:', decryptPath)
    ta.id = "copy"
    document.body.appendChild(ta)
    await toClipboard()
    document.body.removeChild(ta)
  }

  return (
    <form className="flex flex-grow flex-col" onSubmit={formContinue}>
      {state === FormState.MESSAGE && (
        <label className="flex flex-grow flex-col m-8">
          <div>Enter Message: </div>
          <textarea
            className="input flex-grow"
            value={pt}
            onInput={(e) => setPt(e.currentTarget.value)}
          ></textarea>
        </label>
      )}
      {state === FormState.PASSPHRASE && (
        <>
          <label className="flex flex-col m-8">
            <div>Enter password: </div>
            <input
              type="password"
              className="input"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          <button type="button" onClick={backToMessage}>
            Back
          </button>
        </>
      )}
      {state === FormState.CT && (
        <div>
          <button type="button" onClick={copyUrl}>
            Copy Decryption URL
          </button>
        </div>
      )}
      {/* <button
        type="button"
        id="copy"
        data-clipboard-text={decryptPath}
        onClick={toClipboard}
      >
        Copy URL
      </button> */}
      {/* <Link to={decryptPath}>Decryption link</Link> */}
      <button
        type="button"
        className="flex h-12 m-8 p-12"
        onClick={formContinue}
      >
        {state !== FormState.CT ? "Encrypt" : "Reset"}
      </button>
    </form>
  )
}
