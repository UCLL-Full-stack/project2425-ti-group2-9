import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Organizer } from '@types';
import OrganizerService from '@services/OrganizerService';
import OrganizerOverviewTable from '@components/OrganizerOverviewTable';
import EventOverviewTable from '@components/EventOverviewTable';

const organizers: React.FC = () => {
    const [organizers, setOrganizers] = useState<Array<Organizer>>();
    const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);

    const getOrganizers = async () => {
        const response = await OrganizerService.getAllOrganizers();
        const responseOrganizers = await response.json();
        setOrganizers(responseOrganizers);
    }

    useEffect(() => {
        getOrganizers();
    }, []);

    const handleOrganizerSelection = (organizer: Organizer) => {
        setSelectedOrganizer(organizer);
    };

    return (
        <>
            <Head>
                <title>Organizers</title>
            </Head>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h2>Organizers</h2>
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