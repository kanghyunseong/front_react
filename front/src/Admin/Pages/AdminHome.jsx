import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../Components/DashBoard/DashBoard";

// Cars Components
import CarsOverview from "./Cars/CarsOverview";
import CarsReservation from "./Cars/CarsReservation";
import CarsRegistration from "./Cars/CarsRegistration";
import CarsSettings from "./Cars/CarsSettings";

// Community Components
import CommunityDeclaration from "./Community/CommunityDeclaration";
import CommentDeclaration from "./Community/CommentDeclaration";

import Layout from "../Components/Layout/Layout";
import NoticeList from "./Community/NoticeList";
import NoticeWrite from "./Community/NoticeWrite";

const AdminHome = () => {
  return (
    <Layout>
      <Routes>
        {/* 대시보드 (기본 경로) */}
        <Route path="/" element={<DashBoard />} />

        {/* Cars */}
        <Route path="cars/overview" element={<CarsOverview />} />
        <Route path="cars/reservation" element={<CarsReservation />} />
        <Route path="cars/registration" element={<CarsRegistration />} />
        <Route
          path="cars/edit"
          element={<CarsRegistration isEditMode={true} />}
        />
        <Route path="cars/settings" element={<CarsSettings />} />

        {/* Community */}
        <Route
          path="community/declaration"
          element={<CommunityDeclaration />}
        />
        <Route
          path="community/comment/declaration"
          element={<CommentDeclaration />}
        />
        <Route path="community/notice/noticeList" element={<NoticeList />} />
        <Route path="community/notice/noticeWrite" element={<NoticeWrite />} />
        <Route
          path="community/notice-edit"
          element={<NoticeWrite isEditMode={true} />}
        />
        <Route path="enviroments/enviromentsVisualization" />
        <Route path="" />
      </Routes>
    </Layout>
  );
};

export default AdminHome;
