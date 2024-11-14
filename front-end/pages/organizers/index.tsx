import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Organizer } from '@types';
import OrganizerService from '@services/OrganizerService';
import OrganizerOverviewTable from '@components/organizers/OrganizerOverviewTable';
import EventOverviewTable from '@components/events/EventOverviewTable';
import Header from '@components/headers';
import useInterval from "use-interval";

const organizers: React.FC = () => {
    const [organizers, setOrganizers] = useState<Array<Organizer>>();
    const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
    const [error, setError] = useState<string>();

    const getOrganizers = async () => {
        setError("");
        const response = await OrganizerService.getAllOrganizers();
        const responseOrganizers = await response.json();

        if(response.status !== 200) {
            setError(responseOrganizers.errorMessage);
            return;
        }
        setOrganizers(responseOrganizers);
    }

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
                <section>
                    {organizers &&(
                        <OrganizerOverviewTable 
                            organizers={organizers}
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