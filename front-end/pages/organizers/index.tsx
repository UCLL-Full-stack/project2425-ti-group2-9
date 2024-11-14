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
    const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
    

    const getOrganizers = async () => {
       
        const response = await OrganizerService.getAllOrganizers();
        const organizers = await response.json();

        return {
            organizers
        }
    };

    const {data, isLoading, error} = useSWR(
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
                {error && <div className="test-red-800">{error}</div>}
                {isLoading && <p>Is loading ...</p>}
                <section>
                    {data &&(
                        <OrganizerOverviewTable 
                            organizers={data.organizers}
                            selectOrganizer={handleOrganizerSelection}
                        />
                    )}
                </section>
                {selectedOrganizer && (
                    <section>
                        <h2>Events by {selectedOrganizer.companyName}</h2>
                        <EventOverviewTable organizer={selectedOrganizer}/>
                    </section>
                    
                )}
            </main>
        </>
        
    );
};

export default organizers;