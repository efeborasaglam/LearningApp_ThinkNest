"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Note {
  note: string;
  topic: string;
  color: string;
}

const NotesStat = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  // Lade Notizen aus dem localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("postIts") || "[]");
    setNotes(savedNotes);
  }, []);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Gruppiere Notizen nach Themen (topic)
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.topic]) {
      acc[note.topic] = [];
    }
    acc[note.topic].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div className="bg-white rounded-xl min-w-[35rem] relative flex flex-col justify-between  dark:bg-sky-950 transition-colors duration-300">
      <div className="px-8 py-8">
        <div className="flex justify-between text-semibold mb-4 text-lg">
          <p>Notes</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={4}
            height={4}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#9A9A9A] font-semibold mb-6">Notizen</p>

        {/* Kategorien und Notizen */}
        <div className="space-y-6">
          {notes.length === 0 ? (
            <p className="text-gray-500 pl-5 text-sm mt-6">No notes available</p>
          ) : (
            Object.keys(groupedNotes).map((category) => (
              <div key={category} className="pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer p-3 rounded-lg text-black"
                  style={{ backgroundColor: groupedNotes[category][0].color }}
                  onClick={() => toggleCategory(category)}
                >
                  <p className="text-sm font-semibold">{category || "Ohne Thema"}</p>
                  <Image
                    src={
                      collapsedCategories.includes(category)
                        ? "/assets/icons/arrow_drop_down_icon.svg"
                        : "/assets/icons/arrow_drop_up_icon.svg"
                    }
                    alt="toggle_icon"
                    width={12}
                    height={12}
                  />
                </div>
                {!collapsedCategories.includes(category) && (
                  <div className="space-y-3 mt-3">
                    {groupedNotes[category].map((note, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-betwee p-2 rounded-md"
                      >
                        <p className="text-sm font-medium text-black">{note.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-end items-end pr-8 pb-8">
        <Link href="/notes">
          <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotesStat;
