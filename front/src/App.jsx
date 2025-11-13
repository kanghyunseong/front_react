import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import CarsSearchList from "./component/Cars/CarsSearchList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cars/searchList" element={<CarsSearchList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
