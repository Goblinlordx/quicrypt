import { useEffect, useState } from "react"
import { History } from "history"
import { match, useLocation, useRouteMatch } from "react-router"
import { useHistory } from "react-router-dom"
import { decrypt, useDecrypt } from "./crypto"

type PropsType = {
  ct: string
}

const useQuery = () => new URLSearchParams(useLocation().search)

const withQueryReset = (
  fn: any,
  history: History<unknown>,
  match: match<{}>
) => {
  const { path } = match
  return (...args: any[]) => {
    history.replace(path, { query: {} })
    return fn(...args)
  }
}

export const DecryptView = ({ ct }: PropsType) => {
  const [password, setPassword] = useState("")
  const [pt, setPt] = useState<null | string>(null)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const [_pt, err] = await decrypt(password, ct)
    if (!err) return setPt(_pt)
  }

  return (
    <div className="flex flex-grow flex-col m-4">
      {pt === null && (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="flex flex-col m-4">
            <div>Password: </div>
            <input
              type="password"
              className="input"
              onInput={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </label>

          <input type="button" value="Decrypt" />
        </form>
      )}
      {pt !== null && (
        <label className="flex flex-col m-4">
          <div>Message: </div>
          <textarea
            className="input"
            value={pt}
            onChange={(e) => e.preventDefault()}
          />
        </label>
      )}
      {/* <label className="flex flex-col flex-grow m-4">
        <div>Message: </div>
      </label> */}
    </div>
  )
}
