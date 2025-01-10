import React, { useEffect, useRef, useState } from "react"
import { Card,CardTitle,CardContent } from "./ui/card";
import { useEvent } from "@/hooks/useEvent";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

export default function EventList(){
  
  const {events} = useEvent();

  const [selectedPriority, setSelectedPriority] = useState(""); 

  const filteredEvents = selectedPriority
    ? events.filter((event) => event.priority === selectedPriority)
    : events;

  return (
      <>

        <ScrollArea className="w-1/3 h-screen border-l-2">
          <h1 className="text-4xl font-bold pb-4">My Tasks</h1>
          <div className="flex gap-4 mb-4 ml-4">
            <button
              onClick={() => setSelectedPriority("high")}
              className={` text-sm py-2 px-4 rounded-lg ${selectedPriority === "high" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            >
              High
            </button>
            <button
              onClick={() => setSelectedPriority("medium")}
              className={`text-sm py-2 px-4 rounded-lg ${selectedPriority === "medium" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            >
              Medium 
            </button>
            <button
              onClick={() => setSelectedPriority("low")}
              className={`text-sm py-2 px-4 rounded-lg ${selectedPriority === "low" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Low 
            </button>
            <button
              onClick={() => setSelectedPriority("")} // Reset filter
              className={`text-sm py-1 px-2 rounded-lg ${selectedPriority === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              All Events
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {
              filteredEvents.length > 0 ? filteredEvents.map((event)=>(
                <ItemBox event={event}/>
              )) : <div className="mt-40 text-gray-500 font-bold">Nothing here, Add events !!</div>
            }
          </div>
        </ScrollArea>
      </>
  )
}

function ItemBox({event}){

  const { deleteEvent} = useEvent();

  const handleDelete = (id)=>{
    deleteEvent(id);
    toast.success("Congratulations, Event successfully Completed")
    confettiSideCannons();
  }

  const priorityClass = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-green-200"
  }
  return (
    <>
      <div className={`text-sm ${priorityClass[event.priority]} flex flex-col gap-1 border-b-2 w-full mx-6 shadow-lg rounded-xl px-4 py-1`} >
        <div className="flex flex-col items-start px-5 py-3 gap-1">
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-semibold text-gray-800">{event.event}</h1>
            {event.date ? <span className="text-xs text-gray-500">{event.date}</span>:<></>}
          </div>
          {event.description ? <p className="text-sm text-gray-600">{event.description}</p> : <></>}
          {event.fromTime && event.toTime ? <p className="text-md text-gray-700">
            {"From " + event.fromTime + " - " + event.toTime}
          </p> : <></>}
        </div>

        <div className="flex justify-between items-center">
          <button
            className=" py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-4xl"
            onClick={() => handleDelete(event.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        </div>
      </div>
    </>
  )
}
const confettiSideCannons = () => {
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};  