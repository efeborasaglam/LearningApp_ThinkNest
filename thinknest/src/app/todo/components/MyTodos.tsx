import React, { useState, useEffect } from "react";
import Image from "next/image";

type Event = {
name: string;
color: string;
isHighlighted: boolean;
};

const MyEvents = () => {
const [eventsCategorys, setEventsCategorys] = useState<Event[]>([]);
const [isDropdownOpen, setIsDropdownOpen] = useState(true);
const [isAddingEventCategory, setIsAddingEventCategory] = useState(false);
const [eventCategoryName, setEventCategoryName] = useState("");
const [eventColor, setEventColor] = useState("#28AD5E");

useEffect(() => {
  try {
    const savedEventCategories = localStorage.getItem("eventCategories");
    if (savedEventCategories) {
      const parsedCategories = JSON.parse(savedEventCategories);
      if (Array.isArray(parsedCategories)) {
        setEventsCategorys(parsedCategories);
      }
    }
  } catch (error) {
    console.error("Error loading event categories:", error);
  }
}, []);

useEffect(() => {
  try {
    if (eventsCategorys.length > 0) {
      localStorage.setItem("eventCategories", JSON.stringify(eventsCategorys));
    }
  } catch (error) {
    console.error("Error saving event categories:", error);
  }
}, [eventsCategorys]);

const toggleDropdown = () => {
  setIsDropdownOpen((prev) => !prev);
};

const handleAddEventCategory = () => {
  setIsAddingEventCategory(true);
};

const handleCreateEventCategory = () => {
  if (eventCategoryName.trim() === "") return;
  const newEvent: Event = {
    name: eventCategoryName,
    color: eventColor,
    isHighlighted: true,
  };
  setEventsCategorys((prev) => [...prev, newEvent]);
  setEventCategoryName("");
  setEventColor("#000000");
  setIsAddingEventCategory(false);
  setIsDropdownOpen(true);
};

const toggleHighlight = (index: number) => {
  setEventsCategorys((prev) =>
    prev.map((event, i) =>
      i === index ? { ...event, isHighlighted: !event.isHighlighted } : event
    )
  );
};

const handleDeleteEventCategory = (index: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this event category?"
  );
  if (confirmDelete) {
    setEventsCategorys((prev) => {
      const updatedCategories = prev.filter((_, i) => i !== index);
      localStorage.setItem("eventCategories", JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  }
};

const handleCloseDialog = () => {
  setIsAddingEventCategory(false);
};

const colors = [
  "#03c995",
  "#5e2bea",
  "#f84b5f",
  "#1a51f3",
  "#fec530",
  "#ff5a1a",
];

return (
  <div className="mb-10 flex justify-start">
    <div className="flex flex-col rounded-xl bg-white p-6 space-y-7 items-start  dark:bg-sky-950 transition-colors duration-300">
      <div className="flex justify-between w-full items-center space-x-8">
        <p className="text-[1.1rem] font-bold">My To Do's</p>
        <div className="flex space-x-4 items-center">
          <Image
            src="/assets/icons/create_icon.svg"
            alt="create_icon"
            width={30}
            height={30}
            className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
            onClick={handleAddEventCategory}
          />
          <Image
            src={isDropdownOpen ? "/assets/icons/arrow_drop_down_icon.svg" : "/assets/icons/arrow_drop_up_icon.svg"}
            alt="dropdown_icon"
            width={30}
            height={30}
            className="hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {isAddingEventCategory && (
        <div className="bg-gray-100 p-4 rounded-lg w-full space-y-4 dark:bg-sky-950 transition-colors duration-300">
          <input
            type="text"
            placeholder="Event name"
            value={eventCategoryName}
            onChange={(e) => setEventCategoryName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-sm"
          />
          <div className="flex space-x-2">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-5 h-5 rounded-full cursor-pointer border-2 transition-colors duration-300 ${eventColor === color ? "border-green-500" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                onClick={() => setEventColor(color)}
              />
            ))}
          </div>

          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={handleCloseDialog}
              className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white text-xs px-4 py-2 rounded-md"
              onClick={handleCreateEventCategory}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {isDropdownOpen && (
        <div className="rounded-lg w-full">
          {eventsCategorys.length === 0 ? (
            <div className="text-gray-400">No Events</div>
          ) : (
            <ul className="space-y-2">
              {eventsCategorys.map((event, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 rounded-md hover:bg-gray-200 group w-full"
                >
                  <span
                    className="w-5 h-5 rounded-sm cursor-pointer flex-shrink-0 mr-3"
                    style={{
                      backgroundColor: event.isHighlighted ? event.color : "transparent",
                      border: `2px solid ${event.color}`,
                    }}
                    onClick={() => toggleHighlight(index)}
                  ></span>

                  <p className="flex-1 text-left self-center">{event.name}</p>

                  <Image
                    src="/assets/icons/delete_icon.svg"
                    alt="delete_icon"
                    width={20}
                    height={20}
                    className="opacity-0 group-hover:opacity-100 hover:bg-gray-400 rounded-md cursor-pointer transition-opacity duration-200"
                    onClick={() => handleDeleteEventCategory(index)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default MyEvents;
