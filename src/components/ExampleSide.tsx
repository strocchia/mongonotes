"use client";

import { Button } from "flowbite-react";
import { Color, colors } from "@/lib/Colors";
import { Note } from "@/lib/Note";
import React, { useState, Dispatch } from "react";

import { useAuth } from "@clerk/nextjs";
import { UserButton, SignOutButton } from "@clerk/nextjs";

function ExampleSide({
  notes,
  setNotes,
  selectedColor,
  setSelectedColor,
  openModal,
}: {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;
  selectedColor: string | null;
  setSelectedColor: Dispatch<React.SetStateAction<string | null>>;
  openModal: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { getToken, isLoaded, sessionId, userId } = useAuth();

  const toggleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  // const plusBlankNote = (color: string) => {
  //   const blankNote = {
  //     id: Date.now(),
  //     content: "",
  //     color,
  //     timestamp: new Date(),
  //   };

  //   console.log("Before:", notes);
  //   setNotes((prev) => [...prev, blankNote]);
  //   console.log("After:", notes);
  // };

  const colorClick = (color: Color) => {
    setSelectedColor(color.hashcode);
    openModal();
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen w-[12.5rem] justify-between bg-white mx-[10px]">
      <div className="flex flex-col h-auto w-auto items-center justify-center gap-1 my-5">
        {sessionId && userId && (
          <>
            <a
              href=""
              className="flex relative text-gray-600 hover:bg-gray-50 hover:text-gray-800 p-1 rounded"
              onClick={toggleMenu}
            >
              Toggle me to +Note
            </a>
            <span className="text-xs font-mono text-black">
              ( <span className="italic">{isExpanded ? "open" : "closed"}</span>{" "}
              )
            </span>
          </>
        )}
        <div className="text-xs text-black flex flex-col items-center justify-center gap-4 mt-10">
          <UserButton />
          <div className="border p-2 rounded hover:bg-gray-300 hover:font-medium">
            <SignOutButton />
          </div>
        </div>
      </div>

      <div
        className={`border-t border-gray-100 transition-all duration-300 overflow-hidden 
            ${isExpanded ? "h-1/2" : "h-0"}`}
      >
        <div className="px-2">
          <div className="py-4">
            <ul className="border-gray-500">
              {colors.map((clr, idx) => {
                let annotation = null;
                switch (clr.name.charAt(0)) {
                  case "a":
                  case "e":
                  case "i":
                  case "o":
                  case "u":
                    annotation = `Add an ${clr.name} note.`;
                    break;

                  default:
                    annotation = `Add a ${clr.name} note.`;
                    break;
                }

                return (
                  <li key={idx}>
                    <a
                      className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      onClick={() => colorClick(clr)}
                    >
                      <div
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-600"
                        style={{
                          backgroundColor: clr.hashcode,
                          margin: "5px 0",
                        }}
                      />

                      <span className="absolute top-1/2 -translate-y-1/2 text-xs font-normal opacity-0 group-hover:opacity-100">
                        {annotation}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleSide;
