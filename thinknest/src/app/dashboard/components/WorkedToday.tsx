import React, { useEffect, useState } from 'react';
import DashboardStats from './DashboardStats';

const WorkedToday = () => {
  const [workedHours, setWorkedHours] = useState("00:00");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const currentTime = new Date();

    const pastEvents = storedEvents.filter((event: any) => {
      const eventEnd = new Date(event.end);
      return eventEnd <= currentTime;
    });

    const totalMinutes = pastEvents.reduce((acc: number, event: any) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const duration = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60);
      return acc + duration;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setWorkedHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }, []);

  return (
    <div className="rounded-lg">
      <DashboardStats 
        value={workedHours} 
        iconPath="/assets/icons/workedweek_icon.svg" 
        label="Worked Today" 
      />
    </div>
  );
}

export default WorkedToday;
