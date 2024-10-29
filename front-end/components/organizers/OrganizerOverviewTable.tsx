import React from 'react';
import { Organizer } from '@types';

type Props = {
    organizers: Array<Organizer>;
    selectOrganizer: (organizer: Organizer) => void;
};

const OrganizerOverviewTable: React.FC<Props> = ({organizers, selectOrganizer}: Props) => {
    return (
        <>
            {organizers && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizers.map((organizer, index) => (
                            <tr key={index}onClick={() => selectOrganizer(organizer)}role="button">
                                <td>{organizer.companyName}</td>
                                <td>{organizer.user.firstName} {organizer.user.lastName}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default OrganizerOverviewTable;