"use client";
import React, { useState, useEffect } from "react";
import { DateSelectArg, EventApi, EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import "./calendarstyle.scss";
import HeaderTitle from "@/components/HeaderTitle";
import MyEvents from "./components/MyEvents";
import CategorySelect from "./components/CategorySelect";

type EventCategory = {
  name: string;
  color: string;
  isHighlighted: boolean;
};

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    event: EventApi | null;
  }>({ visible: false, x: 0, y: 0, event: null });
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);

    const localStart = new Date(selected.start).toLocaleString("sv-SE", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour12: false,
    });
    const localEnd = selected.end
      ? new Date(selected.end).toLocaleString("sv-SE", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: false,
      })
      : "";

    setStartDate(localStart.replace(" ", "T"));
    setEndDate(localEnd.replace(" ", "T"));

    const loadEventCategories = () => {
      const savedCategories = localStorage.getItem("eventCategories");
      if (savedCategories) {
        try {
          const parsedCategories = JSON.parse(savedCategories);
          if (Array.isArray(parsedCategories)) {
            setEventCategories(parsedCategories);
          }
        } catch (error) {
          console.error("Error parsing event categories:", error);
        }
      }
    };

    loadEventCategories();
    setIsDialogOpen(true);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (newEventTitle && (isAllDay || (startDate && endDate))) {
      const calendarApi = selectedDate?.view.calendar;
      calendarApi?.unselect();

      const selectedCategoryObj = eventCategories.find(
        (category) => category.name === selectedCategory
      );
      const eventColor = selectedCategoryObj
        ? selectedCategoryObj.color
        : "#28AD5E";

      const newEvent = {
        id: `${startDate}-${newEventTitle}`,
        title: newEventTitle,
        start: new Date(startDate),
        end: isAllDay ? undefined : new Date(endDate),
        allDay: isAllDay,
        location,
        description,
        category: selectedCategory,
        extendedProps: { color: eventColor },
      };

      calendarApi?.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  const handleEventsSet = (events: EventApi[]) => {
    setCurrentEvents(events);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "events",
        JSON.stringify(
          events.map((event) => ({
            id: event.id,
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
            extendedProps: event.extendedProps,
          }))
        )
      );
    }
  };

  const handleRightClick = (event: EventApi | null, e: React.MouseEvent) => {
    e.preventDefault();
    if (event) {
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY, event });
    } else {
      setContextMenu({ visible: false, x: 0, y: 0, event: null });
    }
  };

  const handleDeleteEvent = () => {
    if (contextMenu?.event) {
      try {
        contextMenu.event.remove();
        setContextMenu({ visible: false, x: 0, y: 0, event: null });
      } catch (error) {
        console.error("Fehler beim Löschen des Events", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
    setIsAllDay(false);
    setLocation("");
    setDescription("");
    setSelectedCategory("");
  };

  return (
    <>
      <HeaderTitle title="Calendar" />
      <MyEvents />
      <div className="bg-gray-50 rounded-xl p-8  dark:bg-sky-950 transition-colors duration-300">
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventsSet={handleEventsSet}
          initialEvents={
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("events") || "[]")
              : []
          }
          scrollTime={new Date().toISOString().slice(11, 19)}
          slotDuration="00:30:00"
          slotLabelInterval="01:00:00"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          views={{
            timeGridWeek: {
              nowIndicator: true,
            },
          }}
          locale={{
            code: "de",
            allDayText: "",
          }}
          timeZone="local"
          titleFormat={{
            year: "numeric",
            month: "long",
          }}
          dayHeaderContent={(args) => {
            const date = args.date;
            const today = new Date();
            const isToday =
              date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate();

            const weekdayShort = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(date);

            const day = new Intl.DateTimeFormat("de-DE", {
              day: "numeric",
            }).format(date);

            return (
              <div className="text-center day-header">
                <div>{weekdayShort.toUpperCase()}</div>
                {isToday ? (
                  <div className="day-number">{day}</div>
                ) : (
                  <div>{day}</div>
                )}
              </div>
            );
          }}
          eventContent={(args: EventContentArg) => {
            const { event, view } = args;
            const eventColor = event.extendedProps.color;

            const now = new Date();
            const eventStart = event.start ? new Date(event.start) : null;
            const eventEnd = event.end ? new Date(event.end) : null;

            const isCurrentEvent =
              eventStart &&
              ((!eventEnd && now >= eventStart) ||
                (eventEnd && now >= eventStart && now <= eventEnd));

            // const activeCategory = isCurrentEvent
            //   ? event.extendedProps.category
            //   : null;

            const allEvents = view.calendar.getEvents();

            const isAnyActiveCategoryEvent = allEvents.some((ev) => {
              const evStart = ev.start ? new Date(ev.start) : null;
              const evEnd = ev.end ? new Date(ev.end) : null;
              const isEventActive =
                evStart &&
                ((!evEnd && now >= evStart) ||
                  (evEnd && now >= evStart && now <= evEnd));
              return (
                isEventActive &&
                ev.extendedProps.category === event.extendedProps.category
              );
            });

            const opacity =
              isCurrentEvent || isAnyActiveCategoryEvent ? 1 : 0.5;

            const startDate = event.start
              ? event.allDay
                ? new Date(event.start).toLocaleDateString("de-DE")
                : new Date(event.start).toLocaleString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            const endDate = event.end
              ? event.allDay
                ? new Date(event.end).toLocaleDateString("de-DE")
                : new Date(event.end).toLocaleString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <div
                onContextMenu={(e) => handleRightClick(event, e)}
                className="cursor-context-menu relative"
                style={{
                  backgroundColor: eventColor,
                  opacity,
                }}
              >
                <div className="flex flex-col justify-start text-black">
                  <div className="text-md font-medium">{event.title}</div>
                  {!event.allDay && (
                    <div className="text-sm">{`${startDate} - ${endDate}`}</div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>

      {contextMenu.visible && (
        <div
          className="absolute bg-sky-50 border border-gray-300 rounded-md shadow-md z-50 p-2"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <button
            onClick={handleDeleteEvent}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
          >
            Delete Event
          </button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddEvent}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Event Title
              </label>
              <input
                type="text"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
                className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={startDate.split("T")[0]}
                  onChange={(e) =>
                    setStartDate(
                      `${e.target.value}T${startDate.split("T")[1] || "00:00"}`
                    )
                  }
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                />
                {!isAllDay && (
                  <input
                    type="time"
                    value={startDate.slice(11, 16)}
                    onChange={(e) =>
                      setStartDate(
                        `${startDate.split("T")[0]}T${e.target.value}`
                      )
                    }
                    required
                    className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={endDate.split("T")[0]}
                  onChange={(e) =>
                    setEndDate(
                      `${e.target.value}T${endDate.split("T")[1] || "23:59"}`
                    )
                  }
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                />
                {!isAllDay && (
                  <input
                    type="time"
                    value={endDate.slice(11, 16)}
                    onChange={(e) =>
                      setEndDate(`${endDate.split("T")[0]}T${e.target.value}`)
                    }
                    required
                    className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => setIsAllDay(!isAllDay)}
                  checked={isAllDay}
                />
                <span className="text-sm">All Day</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Event Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                My Event's Categories
              </label>
              {eventCategories.length > 0 ? (
                <CategorySelect
                  categories={eventCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              ) : (
                <p className="text-gray-500 text-sm pl-4">No Event Category</p>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={handleCloseDialog}
                className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calendar;
