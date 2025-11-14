import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import AdminHome from "./Admin/Pages/AdminHome";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminHome />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
