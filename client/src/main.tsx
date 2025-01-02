import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Router } from "./router";
import "./index.css"

const root = document.getElementById("root")!;

const component = (
  <StrictMode>
    <Router></Router>
  </StrictMode>
);

createRoot(root).render(component);