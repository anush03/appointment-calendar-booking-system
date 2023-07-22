import React, { useContext } from "react";
import Calender from "../components/calender/calender";
import { MyContext } from "../context/Context";
import "../App.css";

function Appointment() {
  const { calEvent, setCalEvent } = useContext(MyContext);
  return (
    <div className="appointment">
      <div className="cal">
        <Calender />
      </div>
    </div>
  );
}

export default Appointment;
