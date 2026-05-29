import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";
import {
  CartProvider
} from "./context/CartContext";
import {
  FavoriteProvider
} from "./context/FavoriteContext";

import App from "./App"; 
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoriteProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavoriteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
