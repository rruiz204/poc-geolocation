import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "./pages/Home";
import { Ping } from "./pages/Ping";
import { Coords } from "./pages/Coords";

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/ping" element={<Ping></Ping>} />
        <Route path="/coords" element={<Coords></Coords>} />
      </Routes>
    </BrowserRouter>
  );
};