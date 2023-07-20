import React, { useEffect } from "react";
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
// import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';

const data = [
  {
    Id: 2,
    Subject: "Meeting",
    StartTime: new Date(2023, 6, 18, 10, 0),
    EndTime: new Date(2023, 6, 18, 12, 30),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
  },
];
const fieldsData = {
  id: "Id",
  subject: { name: "Subject" },
  isAllDay: { name: "IsAllDay" },
  startTime: { name: "StartTime" },
  endTime: { name: "EndTime" },
};
const eventSettings = { dataSource: data, fields: fieldsData };
function onDrag() {}
function onResize() {}

function Calender() {
  useEffect(() => {
    // Function to hide the specific element
    const hideElement = () => {
      const divElements = document.getElementsByTagName("div");
      for (let i = 0; i < divElements.length; i++) {
        const div = divElements[i];
        // You can add more conditions to identify the specific element you want to hide
        if (
          div.style.position === "fixed" &&
          div.style.top === "10px" &&
          div.style.left === "10px" &&
          div.style.right === "10px" &&
          div.style.fontSize === "14px"
          // Add more conditions if needed
        ) {
          div.style.display = "none";
        }
      }
    };

    // Call the hideElement function to hide the specific element
    hideElement();
  }, []);
  return (
    <ScheduleComponent
      selectedDate={new Date()}
      eventSettings={eventSettings}
      dragStart={onDrag()}
      resizeStart={onResize()}
    >
      <Inject
        services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
      />
    </ScheduleComponent>
  );
}

export default Calender;
