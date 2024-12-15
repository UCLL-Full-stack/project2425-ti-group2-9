import React, {useEffect, useState } from 'react';
//import { useTranslation } from 'next-i18next';
import { StatusMessage, Event, Organizer, Speaker, User } from '@types'; 
import EventService from '@services/EventService'; 
import OrganizerService from '@services/OrganizerService';
import SpeakerService from '@services/SpeakerService'; 
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import router from 'next/router';

const EventForm = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const userString = sessionStorage.getItem("loggedInUser");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString) as User; 
        setLoggedInUser(parsedUser);
        if(parsedUser.role === "admin") {
          setIsAdmin(true);
        }
        else if(parsedUser.role === "organizer") {
          setIsOrganizer(true);
        }
      } catch (error) {
        console.error("Failed to parse user from sessionStorage:", error);
      }
    }
  }, []);

  const validate = (): boolean => {
    let isValid = true;
    setErrors([]);

    if (!name.trim()) {
      setErrors((errors) => [...errors, 'Name is required']);
      isValid = false;
    }

    if (!description.trim()) {
      setErrors((errors) => [...errors, 'Description is required']);
      isValid = false;
    }

    if (!category.trim()) {
      setErrors((errors) => [...errors, 'Category is required']);
      isValid = false;
    }

    if (startDate && endDate && startDate > endDate) {
      setErrors((errors) => [...errors, 'StartDate must be in the future and is required']);
      isValid = false;
    }

    if (!speakers.length) {
      setErrors((errors) => [...errors, 'At least one speaker is required']);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const event = {
      name,
      description,
      category,
      startDate,
      endDate,
      organizer,
      speakers,
    };

    sessionStorage.setItem('event', name);
    const response = await EventService.createEvent(event);
    const data = await response.json();
    if (!response.ok) {
      setErrors((errors) => [...errors, data.message]);
    } else {
      setStatus('Event created successfully.');
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const getOrganizersAndSpeakers = async () => {
    const responses = await Promise.all([
      OrganizerService.getAllOrganizers(),
      SpeakerService.getAllSpeakers(),
    ]);
    const [organizerResponse, speakerResponse] = responses;

    if (organizerResponse.ok && speakerResponse.ok) {
      const organizers = await organizerResponse.json();
      const speakers = await speakerResponse.json();
      return { organizers, speakers };
    }
  };

  const { data, isLoading, error } = useSWR(
    'organizersAndSpeakers',
    getOrganizersAndSpeakers
  );

  useInterval(() => {
    mutate('organizersAndSpeakers', getOrganizersAndSpeakers());
  }, 15000); // Update every 15 seconds

  const handleOrganizerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrganizerId = Number(e.target.value);
    const selectedOrganizer = data?.organizers.find((org: Organizer) => org.id === selectedOrganizerId);
    if (selectedOrganizer) {
      setOrganizer(selectedOrganizer);
    }
  };

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeakerId = Number(e.target.value);
    const selectedSpeaker = data?.speakers.find((sp:Speaker) => sp.id === selectedSpeakerId);
    if (selectedSpeaker) {
      setSpeakers((prevSpeakers) => [...prevSpeakers, selectedSpeaker]);
    }
  };
  if(isAdmin || isOrganizer){
    return (
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Description */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800">{'Register a New Event'}</h2>
          <p className="text-gray-600 mt-4">
            Please fill out the following fields to register a new event.
          </p>
          <p className="text-gray-600 mt-2">
            Once submitted, the event will be available for participants to view and register.
          </p>
        </div>

        {/* Right side - Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-8 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  value={startDate?.toISOString().slice(0, 16)}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  value={endDate?.toISOString().slice(0, 16)}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            {isAdmin &&
              <div>
                <label className="block text-gray-700">Organizer</label>
                <select
                  value={organizer?.id || ''}
                  onChange={handleOrganizerChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Organizer</option>
                  {data?.organizers.map((org:Organizer) => (
                    <option key={org.id} value={org.id}>
                      {org.companyName}
                    </option>
                  ))}
                </select>
              </div>
            }
            <div>
              <label className="block text-gray-700">Speakers</label>
              <select
                multiple
                onChange={handleSpeakerChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                {data?.speakers.map((sp:Speaker) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.user.firstName} {sp.user.lastName} - {sp.expertise}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg grid grid-cols-1 gap-8">
        <h2 className="text-2xl font-semibold text-red-800">You are not authorized to register a new event.</h2>
      </div>
    );
  }
};

export default EventForm;
