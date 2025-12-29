import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import ProtectedRoute from "./component/ProtectedURL";
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
import NaverLoginCallback from "./component/Member/Login/NaverCallback";
import KakaoLoginCallback from "./component/Member/Login/KakaoCallback";
import KakaoJoin from "./component/Member/Join/KakaoJoin";
import CarsReviewForm from "./component/Cars/CarsReviewForm";
import NoticeDetail from "./component/Boards/Notice/NoticeDetail";
function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isJoin = location.pathname.startsWith("/members/join");
  const isLogin = location.pathname.startsWith("/members/login");
  const isKakaoLogin = location.pathname.startsWith("/members/KakaoJoin");
  return (
    <>
      {!isJoin && !isAdminPage && !isLogin && !isKakaoLogin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/notices/:id" element={<NoticeDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:id" element={<BoardDetail />} />
        <Route path="/imgBoards" element={<ImgBoard />} />
        <Route path="/imgBoards/write" element={<ImgBoardForm />} />
        <Route path="/imgBoards/:id" element={<ImgBoardDetail />} />
        <Route path="/cars/searchList" element={<CarsSearchList />} />
        <Route path="/cars/:carId" element={<CarsDetail />} />
        <Route path="/cars/:carId/reserve" element={<CarsReservation />} />
        <Route
          path="/cars/reserve/:reservationNo/confirm"
          element={<CarsReservationConfirm />}
        />
        <Route
          path="/cars/reserves/searchList"
          element={<CarsReservationChange />}
        />
        <Route path="/cars/reserves/detail" element={<CarsUsageHistory />} />
        <Route path="/cars/:carId/review/write" element={<CarsReviewForm />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route path="/members/join" element={<Join />} />
        <Route path="/members/kakaoJoin" element={<KakaoJoin />} />
        <Route path="/stations" element={<Station />} />
        <Route
          path="/members/naver/callback"
          element={<NaverLoginCallback />}
        />
        <Route
          path="/members/kakao/callback"
          element={<KakaoLoginCallback />}
        />
        <Route path="/members/login" element={<Login />} />
        <Route path="/members/detail" element={<UserDetail />} />
        <Route path="/members/detail/changePwd" element={<UserChangePwd />} />
        <Route path="/members/detail/delete" element={<UserDelete />} />
        <Route path="/members/detail/update" element={<UserUpdate />} />
      </Routes>
      {!isJoin && !isAdminPage && !isLogin && !isKakaoLogin && <Footer />}
    </>
  );
}
export default App;
