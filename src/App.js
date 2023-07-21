import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { MyContext } from "./context/Context";

function App() {
  const [calEvent, setCalEvent] = useState();
  return (
    <MyContext.Provider value={{ calEvent, setCalEvent }}>
      <Navbar />
      <Outlet />
    </MyContext.Provider>
  );
}

export default App;
