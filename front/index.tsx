import React, { FC, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider, Route, createRoutesFromElements, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, NotLoggedIn, useAuth } from "./src/hooks/Auth";
import { LoginPage } from "./src/pages/LoginPage";
import { TomeetaListPage } from "./src/pages/TomeetaListPage";
import { Tomeeta, TomeetaProvider } from "./src/hooks/Tomeeta";
import { Toast, ToastProvider } from "./src/hooks/Toast";
import { Dialog } from "./src/components/Dialog";

const Root: FC = () => {
  const [open, setOpen] = useState(false);
  const { signOut, user } = useAuth();
  const location = useLocation();
  const isLoggedIn = user && user !== NotLoggedIn;

  return (
    <>
      <header>
        <nav>
          <a href="/"><h1>Tomitter</h1></a>
          <ul>
            <li>
              <a onClick={signOut} style={{ cursor: "pointer" }}>
                {!isLoggedIn ? "Not logged in" : user?.name ?? "No name"}
              </a>
            </li>
            {isLoggedIn && <li>
              <a onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
                New
              </a>
            </li>}
          </ul>
        </nav>
      </header>
      {user === NotLoggedIn && location.pathname !== "/login"
        ? <Navigate replace to="/login"/>
        : <Outlet />}
      <footer>
        <h6>kojiro.ueda</h6>
      </footer>
      <Toast />
      <Dialog open={open}><Tomeeta /></Dialog>
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<TomeetaListPage />}></Route>
    </Route>
  )
);

const root = createRoot(document.getElementById("app")!);
root.render(
  <ToastProvider>
    <AuthProvider>
      <TomeetaProvider>
        <RouterProvider router={router} />
      </TomeetaProvider>
    </AuthProvider>
  </ToastProvider>
)
