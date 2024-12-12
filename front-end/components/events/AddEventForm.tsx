import React, {useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { StatusMessage, Event, Organizer, Speaker } from '@types'; // Adjust import path as needed
import EventService from '@services/EventService'; // Adjust import path as needed
import OrganizerService from '@services/OrganizerService'; // Adjust import path as needed
import SpeakerService from '@services/SpeakerService'; // Adjust import path as needed
import useSWR from 'swr';
import useInterval from "use-interval";

const EventForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Event>({
    name: '',
    description: '',
    category: '',
    startDate: new Date(),
    endDate: new Date(),
    organizer: { id: 0, user: { username: '', email: '' }, companyName: '', events: [] },
    speakers: [],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState<number | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrganizerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrganizerId = Number(e.target.value);
    const selectedOrganizer = organizers.find((org) => org.id === selectedOrganizerId);
    if (selectedOrganizer) {
      setFormData((prevData) => ({
        ...prevData,
        organizer: selectedOrganizer,
      }));
    }
  };

  const [dropdownOpenOrganizer, setDropdownOpenOrganizer] = useState(false);
  const [dropdownOpenSpeaker, setDropdownOpenSpeaker] = useState(false);

  const toggleDropdownOrganizer = () => setDropdownOpenOrganizer((prev) => !prev);
  const toggleDropdownSpeaker = () => setDropdownOpenSpeaker((prev) => !prev);

  const validate = (): boolean => {
    let isValid = true;
    setErrors([]);

    if (!formData.name.trim()) {
      setErrors((errors) => [...errors, 'Name is required']);
      isValid = false;
    }

    if (!formData.description.trim()) {
      setErrors((errors) => [...errors, 'Description is required']);
      isValid = false;
    }

    if (!formData.category.trim()) {
      setErrors((errors) => [...errors, 'Category is required']);
      isValid = false;
    }

    if (!formData.startDate || formData.startDate < new Date()) {
      setErrors((errors) => [...errors, 'StartDate must be in the future and is required']);
      isValid = false;
    }

    if (!formData.endDate || formData.endDate <= formData.startDate) {
      setErrors((errors) => [...errors, 'End Date must be after Start Date and is required']);
      isValid = false;
    }

    if (!formData.organizer.id) {
      setErrors((errors) => [...errors, 'Organizer is required']);
      isValid = false;
    }

    if (!formData.speakers.length) {
      setErrors((errors) => [...errors, 'At least one speaker is required']);
      isValid = false;
    }

    return isValid;
  };

  const handleSpeakerToggle = (speaker: Speaker) => {
    setFormData((prevData) => {
      const isSelected = prevData.speakers.some((s) => s.id === speaker.id);
      const newSpeakers = isSelected
        ? prevData.speakers.filter((s) => s.id !== speaker.id)
        : [...prevData.speakers, speaker];
      return { ...prevData, speakers: newSpeakers };
    });
  };

  

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeakerId = Number(e.target.value);
    const selectedSpeaker = speakers.find((sp) => sp.id === selectedSpeakerId);
    if (selectedSpeaker) {
      setFormData((prevData) => ({
        ...prevData,
        speakers: [...prevData.speakers, selectedSpeaker],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    
    sessionStorage.setItem('event', formData.name);
      const response = await EventService.createEvent(formData);
      const data = await response.json();
      if (!response.ok) {
        setErrors((errors) => [...errors, data.message]);
      } else {
        setStatus('Schedule created successfully.');
      }
  };

  const getOrganizersAndSpeakers = async () => {
    const responses = await Promise.all([
      OrganizerService.getAllOrganizers(),
      SpeakerService.getAllSpeakers(),
    ]);
    const [organizerResponse, speakerResponse] = responses;

    if (organizerResponse.ok && speakerResponse.ok) {
      const organizer = await organizerResponse.json();
      const speakers = await speakerResponse.json();
      return {organizer, speakers}
  };
  
  
    

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Description */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">{'Register a New Event'}</h2>
        <p className="text-gray-600 mt-4">
          {t('event.description', 'Please fill out the following fields to register a new event. Make sure to choose the appropriate organizer and add all relevant speakers.')}
        </p>
        <p className="text-gray-600 mt-2">
          {t('event.instructions', 'Once submitted, the event will be available for participants to view and register.')}
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              
              className="mt-8 block w-full border-gray-300 rounded-md shadow-sm"
            />
            
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
        
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Organizer</label>
            <select
              onChange={handleOrganizerChange}
              
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">{'Select the organizer'}</option>
              {organizers.map((organizer) => (
                <option key={organizer.id} value={organizer.id}>
                  {organizer.companyName} (ID: {organizer.id})
                </option>
              ))}
            </select>
            
          </div>

          <div className="relative">
          <button
              id="dropdownBgHoverButton"
              onClick={toggleDropdownSpeaker}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {t('Select Speakers')}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
          </button>



          {dropdownOpenSpeaker && (
            <div id="dropdownBgHover" className="z-10 w-48 bg-white rounded-lg shadow absolute mt-2 dark:bg-gray-700">
              <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                {speakers.map((speaker) => (
                  <li key={speaker.id}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`checkbox-speaker-${speaker.id}`}
                        type="checkbox"
                        checked={formData.speakers.some((s) => s.id === speaker.id)}
                        onChange={() => handleSpeakerToggle(speaker)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label htmlFor={`checkbox-speaker-${speaker.id}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                        <div>{speaker.user.firstName} {speaker.user.lastName}</div>
                        <p id="helper-checkbox-text-3" className="text-xs font-normal text-gray-500 dark:text-gray-300">{speaker.expertise}</p>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}         
        </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Register Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
