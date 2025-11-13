import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

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
