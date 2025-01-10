import { useState } from "react"
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useEvent } from "@/hooks/useEvent";
import toast from "react-hot-toast";

function EventForm({date}){

    const {addEvent} = useEvent();

    const [event , setEvent] = useState("");
    const [description , setDescription] = useState("");
    const [fromTime , setFromTime] = useState("");
    const [toTime , setToTime] = useState("");
    const [priority , setPriority] = useState("low");

    const handleSubmit = (e)=>{
        e.preventDefault();      

        addEvent({
            id:Math.random(),
            event:event,
            description:description,
            fromTime:fromTime,
            toTime:toTime,
            priority:priority,
            date:date,
            status:false,
        })
        
        toast.success('event Successfully added!')
        
    }
    return(
        <>
            <div>
                <div className="bg-gray-50 m-2 p-4 border rounded-3xl flex flex-col gap-4 font-[500] text-[14px] text-gray-600">
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 p-2 text-gray-600">
                    <input
                        type="text"
                        required
                        placeholder="Title of work"
                        className="w-full border-2 rounded-lg px-3 outline-none duration-150 bg-white/20 py-2"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                    />
                    
                    <textarea
                        className="w-full h-24 px-2 py-1.5 bg-gray-100 border-2 rounded-lg "
                        placeholder="Description"
                        value = {description}
                        onChange={(e)=> setDescription(e.target.value)}
                    ></textarea>

                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 justify-between">
                            <h1>Priority</h1>
                            <select 
                                required
                                value={priority}
                                onChange={(e)=>setPriority(e.target.value)}
                                name="priority" id="priority" className="w-fit p-1 bg-gray-100 border rounded-lg">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 justify-between">
                            <h1>From</h1>
                            <input
                                value={fromTime}
                                onChange={(e)=>setFromTime(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="time" />
                        </div>
                        <div className="grid grid-cols-2 justify-between">
                            <h1>To</h1>
                            <input
                                value={toTime}
                                onChange={(e)=>setToTime(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="time" />
                        </div>

                    </div>
                    <Button type="submit">
                        Add  
                    </Button>
                    </form>
                </div>
            </div>         
        
        </>
    )
}


export default EventForm