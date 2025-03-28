import React, { use, useEffect, useState } from 'react';
import Head from 'next/head';
import { Organizer } from '@types';
import OrganizerService from '@services/OrganizerService';
import OrganizerOverviewTable from '@components/organizers/OrganizerOverviewTable';
import EventOverviewTable from '@components/events/EventOverviewTable';
import Header from '@components/headers';
import useInterval from "use-interval";
import useSWR from 'swr';

const organizers: React.FC = () => {
    // const [organizers, setOrganizers] = useState<Array<Organizer>>();
    const [error, setError] = useState<string>();
    const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
    

    const getOrganizers = async () => {
        setError("");
        const response = await OrganizerService.getAllOrganizers();
        if(!response.ok){
            if(response.status === 401){
                setError("You need to be logged in to access this page");
            }else{
                setError(response.statusText);
            }
        }else{
            const organizers = await response.json();
            return {
                organizers
            }
        }
        

        
    };

    const {data, isLoading} = useSWR(
        "organizers",
        getOrganizers
    );

    useInterval(() => {
        getOrganizers();
    }, 15000); // Update every 15 seconds

    const handleOrganizerSelection = (organizer: Organizer) => {
        setSelectedOrganizer(organizer);
    };

    return (
        <>
            <Head>
                <title>Organizers</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h2>Organizers</h2>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p>Is loading ...</p>}
                <section>
                    {data &&(
                        <OrganizerOverviewTable 
                            organizers={data.organizers}
                            //selectOrganizer={handleOrganizerSelection}
                        />
                    )}
                </section>
                {/* {selectedOrganizer && (
                    <section>
                        <h2>Events by {selectedOrganizer.companyName}</h2>
                        <EventOverviewTable organizer={selectedOrganizer}/>
                    </section>
                    
                )} */}
            </main>
        </>
        
    );
};

export default organizers;