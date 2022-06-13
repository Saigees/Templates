import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as RouterDOM, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./styling/t.css";
import config from "./T.config";
import HomePage from "./pages/home";
import _redirects from "./pages/_redirects";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterDOM>
      <Helmet>
        <title>{config.title}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:location" element={<_redirects />} />
      </Routes>
    </RouterDOM>
  </React.StrictMode>
);
