import { Routes, Route } from "react-router-dom";
import FourOhFour from "../../pages/fourOhfour";
import Home from "../../pages/home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default Router;
