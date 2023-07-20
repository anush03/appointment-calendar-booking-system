import React from "react";
import Calender from "../components/calender/calender";
import "../App.css";

function Appointment() {
  return (
    <div className="appointment">
      <div className="cal">
        <Calender />
      </div>
    </div>
  );
}

export default Appointment;
