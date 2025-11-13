import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
