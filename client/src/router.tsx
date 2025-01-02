import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </BrowserRouter>
  );
};