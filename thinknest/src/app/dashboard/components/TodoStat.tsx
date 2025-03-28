"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Todo {
  task: string;
  event: {
    name: string;
    color: string;
  };
  date: string;
  completed: boolean;
}

const TodoStat = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.event.name]) {
      acc[todo.event.name] = [];
    }
    acc[todo.event.name].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="bg-white rounded-xl min-w-[35rem] relative flex flex-col justify-between  dark:bg-sky-950 transition-colors duration-300">
      <div className="px-8 py-8">
        <div className="flex justify-between text-semibold mb-4 text-lg">
          <p>To Do</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={4}
            height={4}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#9A9A9A] font-semibold mb-6">To-Do's</p>

        {todos.length === 0 ? (
          <p className="pl-5 text-gray-500 text-sm">No To-Do's available</p>
        ) : null}

        {/* Kategorien und Aufgaben */}
        <div className="space-y-6">
          {Object.keys(groupedTodos).map((category) => (
            <div key={category} className="pb-4">
              <div
                className="flex justify-between items-center cursor-pointer p-3 rounded-lg text-black"
                style={{ backgroundColor: groupedTodos[category][0].event.color }}
                onClick={() => toggleCategory(category)}
              >
                <p className="text-sm font-semibold">{category}</p>
                <Image
                  src={
                    collapsedCategories.includes(category)
                      ? "/assets/icons/arrow_drop_up_icon.svg"
                      : "/assets/icons/arrow_drop_down_icon.svg"
                  }
                  alt="toggle_icon"
                  width={12}
                  height={12}
                />
              </div>
              {!collapsedCategories.includes(category) && (
                <div className="space-y-3 mt-3">
                  {groupedTodos[category].map((todo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <p className="text-sm font-medium text-black">{todo.task}</p>
                      <p className="text-black text-xs">{todo.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-end items-end pr-8 pb-8">
        <Link href="/todo">
          <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TodoStat;
