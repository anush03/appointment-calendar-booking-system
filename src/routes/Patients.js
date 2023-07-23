import React, { useContext } from "react";
import { MyContext } from "../context/Context";

function Patients() {
  const { calEvent } = useContext(MyContext);

  return (
    <div className="patients">
      <h1>Appointments List</h1>
      <></>
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>EndTime</th>
          </tr>
          {calEvent &&
            calEvent.map((val, key) => {
              const startDate = new Date(val.StartTime);
              const endDate = new Date(val.EndTime);
              const startDateString = startDate.toLocaleString();
              const endDateString = endDate.toLocaleString();
              return (
                <tr key={key}>
                  <td>{val.Subject}</td>
                  <td>{startDateString}</td>
                  <td>{endDateString}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default Patients;
