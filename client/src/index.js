import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Шрифти
import "./styles/reset.css";
import "./styles/common.css";
import { BrowserRouter } from "react-router-dom";
// Шрифти

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
