import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  allDay: boolean;
  title: string;
  start: string;
  end: string;
  id: string;
  extendedProps: {
    color: string;
    location: string;
    description: string;
    category: string;
  };
}

const CalendarStat = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    const todayEvents = storedEvents.filter((event: Event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        eventStart.toDateString() === currentTime.toDateString() &&
        ((new Date(event.start) <= currentTime &&
          new Date(event.end) >= currentTime) ||
          new Date(event.start) > currentTime)
      );
    });

    todayEvents.sort(
      (a: Event, b: Event) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    setEvents(todayEvents);
  }, [currentTime]);

  return (
    <>
      <div className="bg-white rounded-xl min-w-[35rem] relative flex flex-col justify-between  dark:bg-sky-950 transition-colors duration-300">
        <div className="px-8 py-8">
          <div className="flex justify-between text-semibold mb-4 text-lg">
            <p>Calendar</p>
            <Image
              src="/assets/icons/lilmenu_icon.svg"
              alt="menu_icon"
              width={4}
              height={4}
              className="cursor-pointer"
            />
          </div>
          <p className="text-sm text-[#9A9A9A] font-semibold">Today</p>
          <div className="pl-5 pt-5">
            <div className="space-y-4 mt-2">
              {events.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No upcoming or ongoing events today
                </p>
              ) : (
                events.slice(0, 4).map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="text-[#9A9A9A] text-xs w-14">
                      {new Date(event.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div
                      className="flex-grow border-solid border-[2px] border-[#F1F1F1] rounded-lg h-14"
                      style={{
                        backgroundColor: event.extendedProps.color,
                        padding: "0.1rem",
                      }}
                    >
                      <p className="text-sm text-[#333333] font-semibold pl-2 pt-1">
                        {event.title}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end px-8 pb-8">
          <Link href="/calendar">
            <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
              View All
            </button>
          </Link>
        </div>  
      </div>
    </>
  );
};

export default CalendarStat;
