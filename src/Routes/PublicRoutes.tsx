import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicForm from "../Pages/DynamicForm/DynamicForm";
import NoPageFound from "../Pages/NoPageFound/NoPageFound";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DynamicForm />} />
        <Route path={"*"} element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
