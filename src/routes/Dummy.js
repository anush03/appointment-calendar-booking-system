import React, { useContext } from "react";
import { MyContext } from "../context/Context";

function Dummy() {
  const { calEvent, setCalEvent } = useContext(MyContext);
  return (
    <div className="home">
      <h1>Dummy Component {calEvent} </h1>
    </div>
  );
}

export default Dummy;
