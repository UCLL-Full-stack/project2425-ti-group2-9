import React from "react";
import { Event } from "@types";

type Props = {
  events: Array<Event>;
};

const EventOverviewTable: React.FC<Props> = ({ events }: Props) => {
  return (
    <div >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Find and attand an event
      </h2>
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
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="p-4 text-gray-700">{event.name}</td>
                <td className="p-4 text-gray-700">{event.description}</td>
                <td className="p-4 text-gray-700">{event.category}</td>
                <td className="p-4 text-gray-700">
                  {new Date(event.startDate).toDateString()}
                </td>
                <td className="p-4 text-gray-700">
                  {new Date(event.endDate).toDateString()}
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
