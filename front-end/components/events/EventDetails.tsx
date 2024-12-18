import React, { useState } from "react";
import { Event } from "@types";
import Header from "@components/headers";
import EventService from "@services/EventService";
import router from "next/router";

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {

  const [update, setUpdate] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const validate = (): boolean => {
      let isValid = true;
      setErrors([]);
      if (!name.trim()) {
          setErrors((errors) => [...errors, 'Name is required']);
          isValid = false;
      }
      return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) {
        return;
      }
      const response = await EventService.updateEvent(name, event);
      const data = await response.json();
      if (response.ok) {
        setStatus(`Event name changed to ${name}.`);
        setTimeout(() => {
          router.push("/events/overview");
        }, 2000);        
      } else {
        setErrors((errors) => [...errors, data.message]);
      }
  }

  const updateForm = async () => {
    setUpdate(true);
  }

  const handleDelete = async(event: Event | null) => {
    if (event){
      const response =  await EventService.deleteEvent(event);
      if(response.ok){
        setTimeout(() => {
          router.push("/events/overview");
        }, 2000);
      }
    }
      
  }


  return (
    <div className="flex justify-center items-center py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {event.name}
        </h2>
        <p className="text-gray-600 text-center mb-6">{event.description}</p>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-semibold">Start:</span>
            <span>
              {new Date(event.startDate).toLocaleDateString()}{" "}
              {new Date(event.startDate).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-700 mt-2">
            <span className="font-semibold">End:</span>
            <span>
              {new Date(event.endDate).toLocaleDateString()}{" "}
              {new Date(event.endDate).toLocaleTimeString()}
            </span>
            
          </div>
          <button
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  handleDelete(event);
                }}
          >DELETE</button>
          <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  updateForm();
                }}
          >UPDATE</button>
        </div>
        {update &&
          <form onSubmit={handleSubmit}>
            {!!errors.length && (
              <ul className="text-red-800 rounded-lg" role="alert">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            {status && (
              <p className="text-green-800" role="alert">
                {status}
              </p>
            )}
            <div>
              <label className="block text-gray-700">Event Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Update Name
            </button>
            
          </form>
        }
      </div>
    </div>
  );
};

export default EventDetails;
