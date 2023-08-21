import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./views/pages/dashboard";
import SignInPage from "./views/pages/auth/login";
import EmployersPage from "./views/pages/employers";
import ResponsablesPage from "./views/pages/responsables";
import AgentCard from "./views/pages/profile";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

const App = () => {
  const [user, setUser] = useState<{
    isAuthenticated: boolean;
    email: string;
    password: string;
    role: string;
  }>({
    isAuthenticated: false,
    email: "",
    password: "",
    role: "", // Initially set to an empty string
  });

  return (
    <StrictMode>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<SignInPage setUser={setUser} />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/employers" element={<EmployersPage />} />
            <Route path="/profils" element={<AgentCard />} />
            <Route path="/responsables" element={<ResponsablesPage /> } />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </StrictMode>
  );
};

root.render(<App />);
