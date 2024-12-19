import React, { useState } from 'react';
import { Organizer } from '@types';

type Props = {
    organizers: Array<Organizer>;
};

const OrganizerOverviewTable: React.FC<Props> = ({organizers}: Props) => {
    // const [selectOrganizer, setSelectedOrganizer] = useState<Organizer | null>;

    // const selectOrganizer = (organizer: Organizer) => {
    //     setSelectedOrganizer(organizer);
    // };
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
                            <tr >
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