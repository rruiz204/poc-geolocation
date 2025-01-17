import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "./pages/Home";
import { PingWs } from "./pages/PingWs";
import { PingRest } from "./pages/PingRest";
import { Coords } from "./pages/Coords";

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/ping-ws" element={<PingWs></PingWs>} />
        <Route path="/ping-rest" element={<PingRest></PingRest>} />
        <Route path="/coords" element={<Coords></Coords>} />
      </Routes>
    </BrowserRouter>
  );
};