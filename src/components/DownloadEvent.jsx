import React from "react";
import { useEvent } from "@/hooks/useEvent";
import { Button } from "./ui/button";
import { useState } from "react";
const DownloadEvents = () => {
  const { events } = useEvent();

  const [selectedMonth, setSelectedMonth] = useState("")

  const filteredEvents = 
  
   selectedMonth
    ? events.filter(event => {
        if (!event.date) return false; 
        const eventMonth = new Date(event.date).getMonth() + 1; 
        return eventMonth === parseInt(selectedMonth);
      })
    : events;

  const handleDownload = () => {
    const header = "Event,Description,Date,From Time,To Time,Priority\n";
    const csvContent = filteredEvents.map(event => 
      `${event.event},${event.description || ""},${event.date || ""},${event.fromTime || ""},${event.toTime || ""},${event.priority}`
    ).join("\n");

    const csvData = header + csvContent;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'events.csv'; 
    link.click();
  };

  return (
    <div className="mb-4 mt-5 sm:mt-32">
        <div className="mb-4">
        <label htmlFor="month" className="block text-lg font-medium mb-2">
          Select Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md text-black bg-gray-100 focus:ring focus:ring-blue-300"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <Button 
        variant='outline'
        className=" text-black px-20 py-4 rounded bg-blue-100 text-lg "
        onClick={handleDownload}
      >
        Download All Events in File
      </Button>
    </div>
  );
};

export default DownloadEvents;
