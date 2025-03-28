import React, { useEffect, useState } from 'react';
import DashboardStats from './DashboardStats';

const WeeklyActivity = () => {
  const [weeklyActivity, setWeeklyActivity] = useState("0%");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const currentTime = new Date();
    const startOfWeek = new Date(currentTime.setDate(currentTime.getDate() - currentTime.getDay()));
    const endOfWeek = new Date(currentTime.setDate(currentTime.getDate() - currentTime.getDay() + 6));

    const weeklyEvents = storedEvents.filter((event: any) => {
      const eventStart = new Date(event.start);
      return eventStart >= startOfWeek && eventStart <= endOfWeek;
    });

    const totalMinutes = weeklyEvents.reduce((acc: number, event: any) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const duration = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60);
      return acc + duration;
    }, 0);

    const weeklyGoalMinutes = 2400; // 40 hours
    const activityPercentage = (totalMinutes / weeklyGoalMinutes) * 100;
    setWeeklyActivity(`${Math.min(activityPercentage, 100).toFixed(2)}%`);
  }, []);

  return (
    <div  >
      <DashboardStats 
        value={weeklyActivity} 
        iconPath="/assets/icons/twoway_icon.svg" 
        label="Weekly Activity" 
        
      />
    </div>
  );
};

export default WeeklyActivity;
