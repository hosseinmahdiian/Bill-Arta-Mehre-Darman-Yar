import React from "react";
import { Route, Routes } from "react-router-dom";
import Acconut from "../components/Account";
import MakerPDF from "../components/MakerPDF";


const Routers = () => {
  return (
    <Routes>
      <Route path="/bill" element={<MakerPDF />} />
      <Route index element={<Acconut />} />
    </Routes>
  );
};

export default Routers;
