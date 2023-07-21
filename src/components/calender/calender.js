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

// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx0RXxbf1xzZFRGal9TTnVaUiweQnxTdEZjXn1fcXRWRGNaU0R+Ww=="
);

// import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';

function onDrag() {}
function onResize() {}
// const data = [
//   {
//     Id: 1,
//     Subject: "Meeting",
//     StartTime: new Date(2023, 6, 18, 10, 0),
//     EndTime: new Date(2023, 6, 18, 12, 30),
//     IsAllDay: false,
//     Status: "Completed",
//     Priority: "High",
//   },
// ];
// const fieldsData = {
//   id: "Id",
//   subject: { name: "Subject" },
//   isAllDay: { name: "IsAllDay" },
//   startTime: { name: "StartTime" },
//   endTime: { name: "EndTime" },
// };
// const eventSettings = { dataSource: calEvent, fields: fieldsData };

function Calender() {
  // useEffect(() => {
  //   // Function to hide the specific element
  //   const hideElement = () => {
  //     const divElements = document.getElementsByTagName("div");
  //     for (let i = 0; i < divElements.length; i++) {
  //       const div = divElements[i];
  //       // You can add more conditions to identify the specific element you want to hide
  //       if (
  //         div.style.position === "fixed" &&
  //         div.style.top === "10px" &&
  //         div.style.left === "10px" &&
  //         div.style.right === "10px" &&
  //         div.style.fontSize === "14px"
  //         // Add more conditions if needed
  //       ) {
  //         div.style.display = "none";
  //       }
  //     }
  //   };

  //   // Call the hideElement function to hide the specific element
  //   hideElement();
  // }, []);
  const { calEvent, setCalEvent } = useContext(MyContext);

  const scheduleObj = useRef(null);
  const eventSettings = { dataSource: calEvent };

  const onDataBound = useCallback(() => {
    let event = scheduleObj.current.getEvents();
    setCalEvent(event);
  }, [setCalEvent]);

  console.log(calEvent);

  return (
    <>
      <ScheduleComponent
        selectedDate={new Date()}
        eventSettings={eventSettings}
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
    </>
  );
}

export default Calender;
