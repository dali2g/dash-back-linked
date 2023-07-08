import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './views/App'
import SignInPage from './views/auth/login'


const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}


const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite >
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/auth/login" element={<SignInPage />} />
          {/* <Route
            path="/e-commerce/products"
            element={<EcommerceProductsPage />}
          /> */}
          {/* <Route path="/users/list" element={<UserListPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
