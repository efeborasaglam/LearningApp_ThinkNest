import React, { useEffect, useState } from 'react';
import DashboardStats from './DashboardStats';

const RemainingToday = () => {
  const [remainingHours, setRemainingHours] = useState("00:00");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const currentTime = new Date();

    const futureEvents = storedEvents.filter((event: any) => {
      const eventStart = new Date(event.start);
      return eventStart >= currentTime;
    });

    const totalMinutes = futureEvents.reduce((acc: number, event: any) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const duration = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60);
      return acc + duration;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setRemainingHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }, []);

  return (
    <div >
      <DashboardStats
        value={remainingHours}
        iconPath="/assets/icons/workedweek_icon.svg"
        label="Remaining Today"
      />
    </div>
  );
}

export default RemainingToday;