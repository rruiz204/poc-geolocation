import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "./pages/Home";
import { Ping } from "./pages/Ping";

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/ping" element={<Ping></Ping>} />
      </Routes>
    </BrowserRouter>
  );
};