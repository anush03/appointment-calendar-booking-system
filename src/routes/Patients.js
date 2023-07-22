import React, { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import { db } from "../Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

function Patients() {
  const { calEvent, setCalEvent } = useContext(MyContext);
  const patientsDocRef = doc(db, "patients", "calEvent");

  return (
    <div className="patients">
      <h1>Patients</h1>
      <></>
      <table>
        <tr>
          <th>Name</th>
          <th>Start Time</th>
          <th>EndTime</th>
        </tr>
        {calEvent &&
          calEvent.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Subject}</td>
                <td>{val.Subject}</td>
                <td>{val.Subject}</td>
              </tr>
            );
          })}
      </table>
      {/* <button onClick={updateUser}>update</button>
      <button onClick={createUser}>AdD</button> */}
    </div>
  );
}

export default Patients;
