import React, { useEffect, useState } from "react";
import { Event, User } from "@types";
import classNames from "classnames";
import EventService from "@services/EventService";
import { useRouter } from "next/router";


type Props = {
  events: Array<Event>;
};

const EventOverviewTable: React.FC<Props> = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<string>('');
  const router = useRouter();

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
    router.push(`/events/${event.id}`)
  };

  const handleAttending = async (event: Event) => {
    EventService.attendingEvent(event);
    setStatus(`You are registerd`);
    router.push('/')
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find and attend an event</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {status && (
      <p className="text-green-800" role="alert">
        {status}
      </p>
      )}

      {filteredEvents.length > 0 ? (
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
            {filteredEvents.map((event, index) => (
              <tr
                key={index}
                onClick={() => selectEvent(event)}
                className={classNames({
                  "table-active": selectedEvent?.id === event.id,
                })}
                data-testid={`details-button-${index}`}
                role="button"
              >
                <td className="p-4 text-gray-700">{event.name}</td>
                <td className="p-4 text-gray-700">{event.description}</td>
                <td className="p-4 text-gray-700">{event.category}</td>
                <td className="p-4 text-gray-700">{new Date(event.startDate).toLocaleString()}</td>
                <td className="p-4 text-gray-700">{new Date(event.endDate).toLocaleString()}</td>
                {(loggedInUser?.role === 'participant') && (
                  <td>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAttending(event);
                    }}
                    data-testid={`attend-button-${index}`}
                  >
                    Attend
                  </button>
                </td>
                )}
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No events match your search query.</p>
      )}
    </div>
  );
};

export default EventOverviewTable;
