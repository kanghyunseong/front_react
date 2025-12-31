import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../Components/DashBoard/DashBoard";
import CarsOverview from "./Cars/CarsOverview";
import CarsReservation from "./Cars/CarsReservation";
import CarsRegistration from "./Cars/CarsRegistration";
import CarsSettings from "./Cars/CarsSettings";
import CommunityDeclaration from "./Community/CommunityDeclaration";
import CommentDeclaration from "./Community/CommentDeclaration";
import Layout from "../Components/Layout/Layout";
import NoticeList from "./Community/NoticeList";
import NoticeWrite from "./Community/NoticeWrite";
import UserRanking from "./Enviroments/UserRanking";
import UserOverview from "./User/UserOverview";
import UserEdit from "./User/UserEdit";
import CarsEdit from "./Cars/CarsEdit";
import NoticeEdit from "./Community/NoticeEdit";

const AdminHome = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/cars/overview" element={<CarsOverview />} />
        <Route path="/cars/reservation" element={<CarsReservation />} />
        <Route path="/cars/registration" element={<CarsRegistration />} />
        <Route path="/cars/edit/:carId" element={<CarsEdit />} />
        <Route path="/cars/settings" element={<CarsSettings />} />
        <Route
          path="/community/declaration"
          element={<CommunityDeclaration />}
        />
        <Route
          path="/community/comment/declaration"
          element={<CommentDeclaration />}
        />
        <Route path="/community/notice/noticeList" element={<NoticeList />} />
        <Route path="/community/notice/noticeWrite" element={<NoticeWrite />} />
        <Route
          path="/community/notice-edit"
          element={<NoticeWrite isEditMode={true} />}
        />
        <Route
          path="/enviroments/enviromentsUserRanking"
          element={<UserRanking />}
        />
        <Route path="/user/userOverview" element={<UserOverview />} />
        <Route path="/user/edit/:userNo" element={<UserEdit />} />
        <Route
          path="/community/notice/edit/:noticeNo"
          element={<NoticeEdit />}
        />
        <Route
          path="community/declaration"
          element={<CommunityDeclaration />}
        />
        <Route
          path="community/notice/noticeEdit/:noticeNo"
          element={<NoticeEdit />}
        />
      </Routes>
    </Layout>
  );
};

export default AdminHome;
