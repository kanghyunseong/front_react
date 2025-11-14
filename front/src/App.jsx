import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import CarsSearchList from "./component/Cars/CarsSearchList";
import CarsDetail from "./component/Cars/CarsDetail";
import AdminHome from "./Admin/Pages/AdminHome";
import Join from "./component/Member/Join/Join";

import CarsReservationConfirm from "./component/Cars/CarsReservationConfirm";
import CarsReservation from "./component/Cars/CarsReservationForm";
import CarsUsageHistory from "./component/Cars/CarsUsageHistory";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isJoin = location.pathname.startsWith("/members/join");
  return (
    <>
      {!isJoin && !isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/searchList" element={<CarsSearchList />} />
        <Route path="/cars/detail" element={<CarsDetail />} />
        <Route path="/cars/reserve" element={<CarsReservation />} />
        <Route
          path="/cars/reserve/confirm"
          element={<CarsReservationConfirm />}
        />
        <Route path="/reserves/detail" element={<CarsUsageHistory />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/members/join" element={<Join />} />
      </Routes>
      {!isJoin && !isAdminPage && <Footer />}
    </>
  );
}

export default App;
