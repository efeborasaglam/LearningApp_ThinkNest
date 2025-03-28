"use client";

import HeaderTitle from "@/components/HeaderTitle";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

interface EventCategory {
  name: string;
  color: string;
}

interface Todo {
  task: string;
  event: {
    name: string;
    color: string;
  };
  date: string;
  completed: boolean; // Status des To-Dos (abgehakt oder nicht)
}

const ToDo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("eventCategories") || "[]");
    setEventCategories(categories);
  }, []);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (inputValue && selectedEvent && selectedDate) {
      const selectedCategory = eventCategories.find(
        (cat) => cat.name === selectedEvent
      );

      if (!selectedCategory) return;

      const newTodo: Todo = {
        task: inputValue,
        event: selectedCategory,
        date: selectedDate,
        completed: false,
      };

      const updatedTodos = [...todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      setTodos(updatedTodos);
      setInputValue("");
      setSelectedEvent("");
      setSelectedDate("");
    }
  };

  const toggleTodoCompletion = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="min-h-screen">
      <HeaderTitle title="To Do" />

      {/* <MyTodos /> */}

      <div className="bg-white p-6 rounded-lg  dark:bg-sky-950 transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4">Add a To Do</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Add a new to-do"
            value={inputValue || ""}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg flex-grow  dark:bg-sky-950 transition-colors duration-300"
          />
          <select
            value={selectedEvent || ""}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg  dark:bg-sky-950 transition-colors duration-300"
          >
            <option value="" disabled>
              Select Category
            </option>
            {eventCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate || ""}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg  dark:bg-sky-950 transition-colors duration-300"
          />
          <button
            onClick={addTodo}
            className="bg-black text-white px-4 py-2 rounded-lg"
            disabled={!inputValue || !selectedEvent || !selectedDate}
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg mb-2 flex justify-between items-center border border-gray-300 shadow-md ${
                todo.completed ? "opacity-50" : ""
              }`}
              style={{ backgroundColor: todo.event.color }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(index)}
                  className="mr-2"
                />
                <span
                  className={`font-semibold ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.task}
                </span>{" "}
                <span className="text-gray-500">({todo.event.name})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-500 text-sm">{todo.date}</div>
                <button
                  onClick={() => deleteTodo(index)}
                  className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
