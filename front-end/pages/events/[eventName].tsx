import EventDetails from "@components/events/EventDetails";
import EventService from "@services/EventService";
import Header from "@components/headers";
import { Event } from "@types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const GetEventByName: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { eventName } = router.query;

  const fetchEventByName = async (name: string) => {
    try {
      const eventResponse = await EventService.getEventByName(name);
      if (!eventResponse.ok) {
        if (eventResponse.status === 401) {
          setError("You need to be logged in to access this page");
        } else {
          setError(eventResponse.statusText);
        }
        setEvent(null); // Ensure event is cleared if unauthorized
        return;
      }
      const eventData = await eventResponse.json();
      setEvent(eventData);
    } catch (err: any) {
      console.error("Error fetching event:", err);
      setError(err.message || "An unexpected error occurred");
      setEvent(null); // Ensure event is cleared if an error occurs
    } finally {
      setLoading(false);
    }
  };

  
  

  useEffect(() => {
    if (eventName) {
      setLoading(true);
      setError(null);
      fetchEventByName(eventName as string);
    }
  }, [eventName]);

  return (
    <>
        <Header/>
        
        <div>
        {error && <div className="text-red-800">{error}</div>}
        {loading && <p>Is loading ...</p>}
        <section>
            {event && (
              <EventDetails event={event} />
              
            )}
            
        </section>
            
        </div>
    </>
    
  );
};

export default GetEventByName;
