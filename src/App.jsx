import React, { Suspense, lazy } from "react";
import "./assets/tailwind.css"
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout"

const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;