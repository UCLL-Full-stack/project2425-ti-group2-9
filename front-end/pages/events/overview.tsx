import Header from "@components/headers";
import EventOverviewTable from "@components/events/EventOverviewTable";
import exp from "constants";
import { useState } from "react";
import EventService from "@services/EventService";
import useSWR from "swr";
import useInterval from "use-interval";

const events: React.FC = () => {
    const [error, setError] = useState<string>();

    const getEvents = async () => {
        setError("");
        const response = await EventService.getAllEvents();
        if(!response.ok){
            if(!response.ok){
                if(response.status === 401){
                    setError("You need to be logged in to access this page");
                }else{
                    setError(response.statusText);
                }
            }
        }else{
            const events = await response.json();
            return{
                events
            }
        }
    }

    const {data, isLoading} = useSWR(
        "events",
        getEvents
    );

    useInterval(() => {
        getEvents();
    },5000);

    return (
        <>
            <Header />
            <div>
                {error && <div className="test-red-800">{error}</div>}
                {isLoading && <p>Is loading ...</p>}
                <section>
                    {data &&(
                        <EventOverviewTable 
                            events={data.events}
                        />
                    )}
                </section>
                
            </div>
        </>
    );
};

export default events;
