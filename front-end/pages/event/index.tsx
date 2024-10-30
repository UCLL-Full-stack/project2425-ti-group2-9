import React from "react";
import EventForm from "@components/events/AddEventForm";
import EventService from "@services/EventService";

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
        <div>
            <h1>Events</h1>
            <EventForm />
        </div>
    );
}
export default Events;