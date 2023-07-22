import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import "./calender.css";
import {
  ScheduleComponent,
  Inject,
  Agenda,
  Day,
  Month,
  Week,
  WorkWeek,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { MyContext } from "../../context/Context";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase-config";
// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx0RXxbf1xzZFRGal9TTnVaUiweQnxTdEZjXn1fcXRWRGNaU0R+Ww=="
);

function onDrag() {}
function onResize() {}
const dataE = [
  {
    Id: 1,
    Subject: "Meeting",
    StartTime: new Date(2023, 6, 18, 10, 0),
    EndTime: new Date(2023, 6, 18, 12, 30),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
  },
];

function Calender() {
  const { calEvent, setCalEvent } = useContext(MyContext);
  const [flag, setflag] = useState(true);
  const [dataBoundFired, setDataBoundFired] = useState(false);
  const patientsDocRef = doc(db, "patients", "calEvent");

  const scheduleObj = useRef(null);

  useEffect(() => {
    const fetchCalEventsFromFirestore = async () => {
      try {
        const docSnap = await getDoc(patientsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Firebase data", data);

          // Convert events from Firestore to the required format
          const convertedEvents = data.calEvent.map((event) => {
            return {
              Id: event.Id,
              Subject: event.Subject,
              StartTime: new Date(event.StartTime.seconds * 1000), // Convert to milliseconds
              EndTime: new Date(event.EndTime.seconds * 1000), // Convert to milliseconds
              IsAllDay: event.IsAllDay,
              Status: event.Status,
              Priority: event.Priority,
            };
          });

          // Set the converted events to the calEvent state
          setCalEvent(convertedEvents);
          console.log("Intial data", convertedEvents);
          // Set flag to false to indicate that data is fetched
          setflag(false);
        }
      } catch (error) {
        console.error("Error fetching calEvent from Firestore:", error);
      }
    };

    fetchCalEventsFromFirestore();
  }, []);

  // useEffect(() => {
  //   if (flag === false) {
  //     const updateFirestoreWithEvents = async () => {
  //       try {
  //         await updateDoc(patientsDocRef, {
  //           calEvent: calEvent,
  //         });
  //       } catch (error) {
  //         console.error("Error updating calEvent in Firestore:", error);
  //       }
  //     };

  //     updateFirestoreWithEvents();
  //   }
  // }, [calEvent, flag, patientsDocRef]);

  const onDataBound = async () => {
    // let events = scheduleObj.current.getEvents();
    // console.log("events", events);
    if (flag === false) {
      let events = scheduleObj.current.getEvents();
      console.log("events", events);

      //   try {
      //     await setDoc(patientsDocRef, {
      //       calEvent: events,
      //     });
      //   } catch (error) {
      //     console.error("Error updating calEvent in Firestore:", error);
      //   }
      // }
      const filteredEvents = events.filter((event) => event !== undefined);

      if (filteredEvents.length > 0) {
        try {
          await updateDoc(patientsDocRef, {
            calEvent: events,
          });
          console.log("Data successfully updated in Firestore.");
        } catch (error) {
          console.error("Error updating calEvent in Firestore:", error);
        }
      } else {
        console.log("No valid events to save to Firestore.");
      }
    }
  };
  // const [isDataFetched, setDataFetched] = useState(false);
  // const [shouldUpdateFirestore, setShouldUpdateFirestore] = useState(false);

  // useEffect(() => {
  //   const fetchCalEventsFromFirestore = async () => {
  //     try {
  //       const docSnap = await getDoc(patientsDocRef);
  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         const eventsFromFirestore = data.calEvent || [];

  //         const convertedEvents = eventsFromFirestore.map((event) => {
  //           return {
  //             Id: event.Id,
  //             Subject: event.Subject,
  //             StartTime: new Date(event.StartTime),
  //             EndTime: new Date(event.EndTime),
  //             IsAllDay: event.IsAllDay,
  //             Status: event.Status,
  //             Priority: event.Priority,
  //           };
  //         });

  //         setCalEvent(convertedEvents);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching calEvent from Firestore:", error);
  //     }
  //   };

  //   fetchCalEventsFromFirestore();
  // }, [patientsDocRef, setCalEvent]);

  // useEffect(() => {
  //   let shouldUpdateFirestore = false;

  //   const onDataBound = () => {
  //     // Get the latest events from the ScheduleComponent
  //     const events = scheduleObj.current.getEvents();
  //     console.log("events", events);

  //     // Only update calEvent if there are changes in events
  //     if (!arraysAreEqual(calEvent, events)) {
  //       setCalEvent(events);
  //       shouldUpdateFirestore = true;
  //     }
  //   };

  //   // Attach the dataBound event handler if scheduleObj.current is not null
  //   if (scheduleObj.current) {
  //     scheduleObj.current.dataBound = onDataBound;
  //   }

  //   // Clean up the event handler when the component unmounts
  //   return () => {
  //     // Remove the event handler if scheduleObj.current is not null
  //     if (scheduleObj.current) {
  //       scheduleObj.current.dataBound = null;
  //     }

  //     // Update Firestore with the latest events after all other updates are completed
  //     if (shouldUpdateFirestore) {
  //       const updateFirestoreWithEvents = async () => {
  //         try {
  //           await updateDoc(patientsDocRef, {
  //             calEvent: calEvent,
  //           });
  //         } catch (error) {
  //           console.error("Error updating calEvent in Firestore:", error);
  //         }
  //       };

  //       updateFirestoreWithEvents();
  //     }
  //   };
  // }, [calEvent, patientsDocRef, setCalEvent]);
  // // Helper function to check if two arrays are equal
  // const arraysAreEqual = (array1, array2) => {
  //   if (array1.length !== array2.length) return false;

  //   for (let i = 0; i < array1.length; i++) {
  //     if (JSON.stringify(array1[i]) !== JSON.stringify(array2[i])) {
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  // function onDataBound() {}
  console.log("Reload");
  console.log(calEvent);
  console.log("CorrectFormat", dataE);

  return (
    <>
      {calEvent && flag === false && (
        <ScheduleComponent
          selectedDate={new Date()}
          eventSettings={{ dataSource: calEvent }}
          dragStart={onDrag()}
          resizeStart={onResize()}
          enablePersistence={true}
          dataBound={onDataBound}
          ref={scheduleObj}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
          />
        </ScheduleComponent>
      )}
    </>
  );
}

export default Calender;
