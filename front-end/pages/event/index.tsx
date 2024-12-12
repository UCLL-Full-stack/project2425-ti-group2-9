import React from "react";
import EventForm from "@components/events/AddEventForm";
import EventService from "@services/EventService";
import Header from "@components/headers";

const Events = () => {    
    return (
        <>
            <Header/>
            <div>
                <EventForm />
            </div>
        </>
        
    );
}
export default Events;