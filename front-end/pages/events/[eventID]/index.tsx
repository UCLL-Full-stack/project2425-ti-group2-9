import EventDetails from "@components/events/EventDetails";
import EventService from "@services/EventService";
import Header from "@components/headers";
import { Event } from "@types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useInterval from "use-interval";

const GetEventByName: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { eventID } = router.query;

  const fetchEventByID = async (id: string) => {
    try {
      const eventResponse = await EventService.getEventByID(id);
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

  
  const { data } = useSWR(eventID ? `event-${eventID}` : null, () => fetchEventByID(eventID as string
  ), {
    refreshInterval: 5000, 
    revalidateOnFocus: true, 
  });

  useInterval(() => {
    if (eventID) fetchEventByID(eventID as string); 
  }, 5000);



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
