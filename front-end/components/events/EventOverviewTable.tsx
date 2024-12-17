import React, { useEffect, useState } from "react";
import { Event, Participant, User } from "@types";
import ParticipantService from "@services/ParticipantService";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import EventService from "@services/EventService";

type Props = {
  events: Array<Event>;
  participant: Participant;
};

const EventOverviewTable: React.FC<Props> = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userString = sessionStorage.getItem("loggedInUser");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString) as User;
        setLoggedInUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from sessionStorage:", error);
      }
    }
  }, []);

  const selectEvent = (event: Event) => {
    setSelectedEvent(event);
    
  };

  const handleAttending = async (event: Event) => {
    await EventService.attendingEvent(event)
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find and attend an event</h2>
      {events && (
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 rounded-t-lg">
            <tr>
              <th className="p-4 border-b border-gray-300">Name</th>
              <th className="p-4 border-b border-gray-300">Description</th>
              <th className="p-4 border-b border-gray-300">Category</th>
              <th className="p-4 border-b border-gray-300">Start Date</th>
              <th className="p-4 border-b border-gray-300">End Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-100`}
              >
                <td className="p-4 text-gray-700">{event.name}</td>
                <td className="p-4 text-gray-700">{event.description}</td>
                <td className="p-4 text-gray-700">{event.category}</td>
                <td className="p-4 text-gray-700">{new Date(event.startDate).toDateString()}</td>
                <td className="p-4 text-gray-700">{new Date(event.endDate).toDateString()}</td>
                <td>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => {
                      selectEvent(event);
                      handleAttending(event);
                    }}
                  >
                    Attend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventOverviewTable;
