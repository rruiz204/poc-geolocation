/* import { StrictMode } from "react" */
import { createRoot } from "react-dom/client"

import { Router } from "./router";
import "./index.css"

const root = document.getElementById("root")!;

const component = (
  <Router></Router>
);

/* 
<StrictMode>
    
</StrictMode>
*/

createRoot(root).render(component);