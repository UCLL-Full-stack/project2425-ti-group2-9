import React from "react";
import { Event, Organizer} from "@types";

type Props = {
    organizer: Organizer,
}

const EventOverviewTable: React.FC<Props> = ({ organizer}:Props) => {
    return (
        <>
            {organizer && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizer.events.map((event, index) =>(
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{event.category}</td>
                                <td>{event.startDate.toLocaleDateString()}</td>
                                <td>{event.endDate.toLocaleDateString()}</td>
                            </tr>
                        ))}
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    )
}

export default EventOverviewTable;