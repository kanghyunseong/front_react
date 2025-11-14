import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import CarsSearchList from "./component/Cars/CarsSearchList";
import CarsDetail from "./component/Cars/CarsDetail";
import AdminHome from "./Admin/Pages/AdminHome";
import CarsReservationConfirm from "./component/Cars/CarsReservationConfirm";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cars/searchList" element={<CarsSearchList />} />
        <Route path="/cars/detail" element={<CarsDetail/>} />
        <Route path="/cars/reserve/confirm" element={<CarsReservationConfirm />} />
        <Route path="/admin/*" element={<AdminHome />} />

      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
