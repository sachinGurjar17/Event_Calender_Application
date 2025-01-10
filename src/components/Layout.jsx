import EventList from "./EventList";
import Calender from "./Calender";
import { Toaster } from "react-hot-toast";
export default function Layout (){
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Toaster/>
            <Calender/>
            <EventList/>
        </div>
    )
}