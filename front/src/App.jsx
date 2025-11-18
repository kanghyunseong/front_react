import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";

import Board from "./component/Boards/Board/Board";
import BoardForm from "./component/Boards/Board/BoardForm";
import BoardDetail from "./component/Boards/Board/BoardDetail";
import ImgBoard from "./component/Boards/ImgBoard/ImgBoard";
import ImgBoardForm from "./component/Boards/ImgBoard/ImgBoardForm";

import CarsSearchList from "./component/Cars/CarsSearchList";
import CarsDetail from "./component/Cars/CarsDetail";
import AdminHome from "./Admin/Pages/AdminHome";
import Join from "./component/Member/Join/Join";

import CarsReservationConfirm from "./component/Cars/CarsReservationConfirm";
import CarsReservation from "./component/Cars/CarsReservationForm";
import CarsUsageHistory from "./component/Cars/CarsUsageHistory";
import Station from "./component/Stations/Station";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isJoin = location.pathname.startsWith("/members/join");
  return (
    <>
      {!isJoin && !isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:id" element={<BoardDetail />} />
        <Route path="/boards/imgBoard" element={<ImgBoard />} />
        <Route path="/boards/imgBoard/write" element={<ImgBoardForm />} />
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
        <Route path="/stations" element={<Station />} />
      </Routes>
      {!isJoin && !isAdminPage && <Footer />}
    </>
  );
}

export default App;
