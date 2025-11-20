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
import CarsReservationChange from "./component/Cars/CarsReservationChange";
import CarsUsageHistory from "./component/Cars/CarsUsageHistory";

import Station from "./component/Stations/Station";

import Notice from "./component/Boards/Notice/Notice";
import ImgBoardDetail from "./component/Boards/ImgBoard/ImgBoardDetail";
import Login from "./component/Member/Login/Login";
import UserDetail from "./component/Member/detail/UserDetail";
import UserChangePwd from "./component/Member/detail/UserChangePwd";
import UserDelete from "./component/Member/detail/UserDelete";
import UserUpdate from "./component/Member/detail/UserUpdate";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isJoin = location.pathname.startsWith("/members/join");
  const isLogin = location.pathname.startsWith("/members/login");
  return (
    <>
      {!isJoin && !isAdminPage && !isLogin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/boards" element={<Board />} />
        <Route path="/boards/notices" element={<Notice />} />
        <Route path="/boards/boards/write" element={<BoardForm />} />
        <Route path="/boards/boards/:id" element={<BoardDetail />} />
        <Route path="/boards/imgBoards" element={<ImgBoard />} />
        <Route path="/boards/imgBoards/write" element={<ImgBoardForm />} />
        <Route path="/boards/imgBoards/:id" element={<ImgBoardDetail />} />
        <Route path="/cars/searchList" element={<CarsSearchList />} />
        <Route path="/cars/detail" element={<CarsDetail />} />
        <Route path="/cars/reserve" element={<CarsReservation />} />
        <Route
          path="/cars/reserve/confirm"
          element={<CarsReservationConfirm />}
        />
        <Route
          path="/reserves/searchList"
          element={<CarsReservationChange />}
        />
        <Route path="/reserves/detail" element={<CarsUsageHistory />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/members/join" element={<Join />} />
        <Route path="/stations" element={<Station />} />
        <Route path="/members/login" element={<Login />} />
        <Route path="/members/detail" element={<UserDetail />} />
        <Route path="/members/detail/changePwd" element={<UserChangePwd />} />
        <Route path="/members/detail/delete" element={<UserDelete />} />
        <Route path="/members/detail/update" element={<UserUpdate />} />
      </Routes>
      {!isJoin && !isAdminPage && !isLogin && <Footer />}
    </>
  );
}

export default App;
