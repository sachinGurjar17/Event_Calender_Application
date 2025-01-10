import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({children})=>{

    const [events, setEvents] = useState([]);

    useEffect(()=>{
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    },[])


    const addEvent = (newEvent)=>{
        console.log(newEvent);       
        setEvents((prevEvents)=>{
            const updatedEventList = [...prevEvents,newEvent];
            localStorage.setItem("events",JSON.stringify(updatedEventList))
            return updatedEventList ;
        })
    }

    const deleteEvent = (id) => {
        setEvents((prevEvents) => {
          const updatedEvents = prevEvents.filter((event) => event.id !== id);
          localStorage.setItem("events", JSON.stringify(updatedEvents));
          return updatedEvents;
        });
      };
    
    const editEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        return updatedEvents;
    });
    };

    const getEventsForDate = (date)=>{
        const targetDate = date.toISOString().split("T")[0];

        return events.map((event)=> event.date === targetDate)
    }

    return (
        <EventContext.Provider 
            value={{events , addEvent, editEvent, deleteEvent, getEventsForDate}}
        > {children} </EventContext.Provider>
    )
}

export const useEvent = () => {
    return useContext(EventContext)
};
  