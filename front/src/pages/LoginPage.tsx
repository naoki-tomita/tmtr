import React, { FC, useState } from "react";
import { NotLoggedIn, useAuth } from "../hooks/Auth";
import { Navigate } from "react-router-dom";

export const LoginPage: FC = () => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const { user, signIn, signUp } = useAuth();
  if (user && user !== NotLoggedIn) {
    return <Navigate replace to="/" />
  }

  return (
    <main>
      <section>
        <form onSubmit={async (e) => (e.preventDefault(), createAccount ? signUp(mailAddress, password) : signIn(mailAddress, password))}>
          <header>
            <h2>Login</h2>
          </header>
          <label>Mail address</label>
          <input placeholder="mail.address@example.com" value={mailAddress} onChange={e => setMailAddress(e.target.value)} />
          <label>Password</label>
          <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {createAccount && <label>Password again</label>}
          {createAccount && <input placeholder="password" type="password" value={password2} onChange={e => setPassword2(e.target.value)} />}
          <footer>
            <button type="submit">
              {createAccount ? "Create account" : "Login"}
            </button>{" "}
            <div>
              <a onClick={() => setCreateAccount(!createAccount)}>
                {!createAccount ? "Create account" : "Login"}
              </a>
            </div>
          </footer>
        </form>
      </section>
    </main>
  );
}
