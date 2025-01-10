import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import EventList from "./EventList";
import EventForm from "./EventForm";
import DownloadEvents from "./DownloadEvent";

export default function Calender() {

    const [date, setDate] = useState(new Date());

    const handlePreviousMonth = () => {
      setDate((prevDate) => {
        const prevMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
        return prevMonth;
      });
    };
  
    const handleNextMonth = () => {
      setDate((prevDate) => {
        const nextMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
        return nextMonth;
      });
    };

  
    return (
        <>
            <div className="w-full h-full">
                <div className="flex flex-row justify-center ">
                    <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                        <ChevronLeft />
                    </Button>
                    <Month date={date}/>
                    <Button variant="outline" size="icon" onClick={handleNextMonth}>
                        <ChevronRight />
                    </Button>
                </div>
                <div className="text-md mt-10 font-semibold "> 👆 Click on Date for adding new event</div>
                <DownloadEvents/>
            </div>
        </>

    );
}

function Month({date}){

    const currentMonth = date.getMonth();  
    const currentYear = date.getFullYear(); 
  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
  
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(""); 
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-6">
                {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h1>
                <div className="grid grid-cols-7 gap-5">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="font-bold txt-sm sm:text-lg">{day}</div>
                ))}
                {daysArray.map((day, index)=>(
                    <div><Day day={day} currentMonth={currentMonth} currentYear={currentYear} /></div>
                ))}
                </div>
            </div> 
        </>
    )
} 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import {useEvent} from "@/hooks/useEvent";
function Day({day, currentMonth , currentYear}){

    const fulldate = new Date(currentYear,currentMonth,day).toISOString().split("T")[0]

    const {events} = useEvent();

    const priorityClass = {
        high: "bg-red-200",
        medium: "bg-yellow-200",
        low: "bg-green-200"
    }

    return (
        <>
            <Dialog>
                <DialogTrigger variant='oultine' >
                    <Button variant='outnone' className="hover:bg-gray-300">{day}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add task</DialogTitle>
                    <EventForm date={fulldate} />
                </DialogContent>
            </Dialog>

            {
                events.map((event)=> event.date === fulldate ? <div className={`${priorityClass [event.priority]} rounded-lg mb-1 border-b pb-2`}></div>:<></>)
            }
        </>
    )
}

  
  