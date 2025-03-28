"use client";
import WeeklyActivity from "./components/WeeklyActivity";
import WorkedToday from "./components/WorkedToday";
import RemainingWeek from "./components/RemainingToday";
import CalendarStat from "./components/CalendarStat";
import TodoStat from "./components/TodoStat";
import HeaderTitle from "@/components/HeaderTitle";
import Timer from "@/components/Timer";
import NotesStat from "./components/NotesStat";
import ProjectStat from "./components/ProjectStat";
import { useAuth } from "@/lib/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <main className="w-full">
      <div className="flex justify-between ">
        <HeaderTitle title="Today" />
        <Timer />
      </div>
      <div className=" flex justify-center mb-10 ">
        <div className="">
          <WorkedToday />
        </div>
        <div className="">
          <WeeklyActivity />
        </div>
        <div className="">
          <RemainingWeek />
        </div>
      </div>

      <div>
        <div className="flex justify-between space-x-4 mb-10">
          <CalendarStat />
          <TodoStat />
        </div>
        <div className="flex justify-between space-x-4">
          <NotesStat />
          <ProjectStat />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
