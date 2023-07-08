import React, { FC, useState } from "react";
import { NotLoggedIn, useAuth } from "../hooks/Auth";
import { Navigate } from "react-router-dom";

export const LoginPage: FC = () => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = useAuth();
  if (user && user !== NotLoggedIn) {
    return <Navigate replace to="/" />
  }

  return (
    <main>
      <section>
        <form onSubmit={async (e) => (e.preventDefault(), signIn(mailAddress, password))}>
          <header>
            <h2>Login</h2>
          </header>
          <label>Mail address</label>
          <input placeholder="mail.address@example.com" value={mailAddress} onChange={e => setMailAddress(e.target.value)} />
          <label>Password</label>
          <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
