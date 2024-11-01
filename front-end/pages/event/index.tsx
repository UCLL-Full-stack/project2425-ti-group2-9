import React from "react";
import EventForm from "@components/events/AddEventForm";
import EventService from "@services/EventService";
import Header from "@components/headers";

const Events = () => {
    const handleAddEvent = async (eventData: Event) => {
        try {
            const response = await EventService.createEvent(eventData);
            if (!response.ok) {
                throw new Error("Failed to create event");
            }
            console.log("Event created successfully:", await response.json());
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };
    
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