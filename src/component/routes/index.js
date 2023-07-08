import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Category from "../../pages/category";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:categoryId" element={<Category />} />
    </Routes>
  );
};

export default AppRoutes;
