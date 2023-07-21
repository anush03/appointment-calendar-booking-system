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
  // const usersCollectionRef = collection(db, "patients");

  // const eventSettings = { dataSource: data, fields: fieldsData };
  const patientsDocRef = doc(db, "patients", "calEvent");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(patientsDocRef);
      setCalEvent(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Use onSnapshot to listen for changes in real-time
    const unsubscribe = onSnapshot(patientsDocRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        // If data exists in the document, update the calEvent state
        setCalEvent(data.calEvent || []);
      } else {
        // If no data exists, create an empty calEvent array
        setCalEvent([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [patientsDocRef, setCalEvent]);

  useEffect(() => {
    // Function to update the Firestore document whenever calEvent changes
    const updateCalEventInFirestore = async () => {
      try {
        // Convert calEvent to a plain JavaScript array to ensure it's serializable
        const calEventArray = Array.isArray(calEvent) ? calEvent : [];

        // Set the calEvent array in the Firestore document
        await setDoc(patientsDocRef, { calEvent: calEventArray });
      } catch (error) {
        console.error("Error updating calEvent in Firestore:", error);
      }
    };

    updateCalEventInFirestore();
  }, [calEvent, patientsDocRef]);

  // useEffect(() => {
  //   // Use onSnapshot to listen for changes in real-time
  //   const unsubscribe = onSnapshot(patientsDocRef, (snapshot) => {
  //     const data = snapshot.data();
  //     if (data) {
  //       setCalEvent(data.calEvent || []);
  //     } else {
  //       setCalEvent([]);
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  // }, [patientsDocRef, setCalEvent]);

  // const createUser = async () => {
  //   if (calEvent) {
  //     const objectOfObjects = {};
  //     calEvent.forEach((obj) => {
  //       objectOfObjects[obj.Id] = obj;
  //     });
  //     await addDoc(usersCollectionRef, objectOfObjects);
  //   }
  // };
  // const updateUser = async () => {
  //   const userDoc = doc(db, "patients", "FdyyP2VL7pvzUKvmW386");
  //   const objectOfObjects = {};
  //   calEvent.forEach((obj) => {
  //     objectOfObjects[obj.Id] = obj;
  //   });
  //   console.log(objectOfObjects);

  //   await updateDoc(userDoc, objectOfObjects);
  // };

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
