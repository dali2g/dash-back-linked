import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./views/pages/dashboard";
import SignInPage from "./views/pages/auth/login";

import React from "react";
import EmployersPage from "./views/pages/employers";
import ResponsablesPage from "./views/pages/responsables";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/responsables" element={<ResponsablesPage />} />
          <Route path="/employers" element={<EmployersPage />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
