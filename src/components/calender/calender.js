import React, { useEffect, useRef, useContext, useState } from "react";
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase-config";
// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx0RXxbf1xzZFRGal9TTnVaUiweQnxTdEZjXn1fcXRWRGNaU0R+Ww=="
);

function onDrag() {}
function onResize() {}
// const dataE = [
//   {
//     Id: 1,
//     Subject: "Anush",
//     StartTime: new Date(2023, 6, 23, 10, 0),
//     EndTime: new Date(2023, 6, 23, 12, 30),
//     IsAllDay: false,
//     Priority: "High",
//   },
// ];

function Calender() {
  const { calEvent, setCalEvent } = useContext(MyContext);
  const [flag, setflag] = useState(true);
  const patientsDocRef = doc(db, "patients", "calEvent");

  const scheduleObj = useRef(null);

  useEffect(() => {
    const fetchCalEventsFromFirestore = async () => {
      try {
        const docSnap = await getDoc(patientsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          const convertedEvents = data.calEvent.map((event) => {
            return {
              Id: event.Id,
              Subject: event.Subject,
              StartTime: new Date(event.StartTime.seconds * 1000),
              EndTime: new Date(event.EndTime.seconds * 1000),
              IsAllDay: event.IsAllDay,
            };
          });

          setCalEvent(convertedEvents);
        }
        setflag(false);
      } catch (error) {
        console.error("Error fetching calEvent from Firestore:", error);
      }
    };

    fetchCalEventsFromFirestore();
  }, []);

  const onDataBound = async () => {
    if (flag === false) {
      let events = scheduleObj.current.getEvents();

      const FilteredEvents = events.filter((event) => event !== undefined);
      FilteredEvents.forEach((event) => {
        Object.keys(event).forEach((key) => {
          if (event[key] === undefined) {
            event[key] = "";
          }
        });

        Object.keys(event).forEach((key) => {
          if (event[key] === undefined) {
            delete event[key];
          }
        });
      });

      if (FilteredEvents.length > 0) {
        try {
          await updateDoc(patientsDocRef, {
            calEvent: events,
          });
        } catch (error) {
          console.error("Error updating calEvent in Firestore:", error);
        }
      } else {
        console.log("No valid events to save to Firestore.");
      }
    }
  };

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
