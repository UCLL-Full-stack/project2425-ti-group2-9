import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { StatusMessage, Event, Organizer, Speaker } from '@types'; // Adjust import path as needed
import EventService from '@services/EventService'; // Adjust import path as needed
import OrganizerService from '@services/OrganizerService'; // Adjust import path as needed
import SpeakerService from '@services/SpeakerService'; // Adjust import path as needed

const EventForm: React.FC = () => {
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

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const clearMessages = () => setStatusMessages([]);

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
    clearMessages();

    try {
      const response = await EventService.createEvent(formData);
      if (response.ok) {
        setStatusMessages([{ message: 'Your event is successfully registered', type: 'success' }]);
      } else {
        const errorData = await response.json();
        setStatusMessages([{ message: errorData.errorMessage || 'general.error', type: 'error' }]);
      }
    } catch (error) {
      setStatusMessages([{ message: 'general.error', type: 'error' }]);
    }
  };

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await OrganizerService.getAllOrganizers();
        if (response.ok) {
          const data = await response.json();
          setOrganizers(data);
        } else {
          setStatusMessages([{ message: t('general.error'), type: 'error' }]);
        }
      } catch (error) {
        setStatusMessages([{ message: t('general.error'), type: 'error' }]);
      }
    };

    const fetchSpeakers = async () => {
      try {
        const response = await SpeakerService.getAllSpeakers();
        if (response.ok) {
          const data = await response.json();
          setSpeakers(data);
        } else {
          setStatusMessages([{ message: t('general.error'), type: 'error' }]);
        }
      } catch (error) {
        setStatusMessages([{ message: t('general.error'), type: 'error' }]);
      }
    };

    fetchOrganizers();
    fetchSpeakers();
  }, );

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
        {statusMessages.length > 0 && (
          <ul className="mb-4 space-y-2">
            {statusMessages.map(({ message, type }, index) => (
              <li key={index} className={classNames('text-sm p-2 rounded', {
                'bg-red-100 text-red-800': type === 'error',
                'bg-green-100 text-green-800': type === 'success',
              })}>
                {message}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
              required
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
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Organizer</label>
            <select
              onChange={handleOrganizerChange}
              required
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

          <div>
            <label className="block text-gray-700">Speakers</label>
            <select
              onChange={handleSpeakerChange}
              multiple
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              {speakers.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.user.firstName} {speaker.user.lastName}
                </option>
              ))}
            </select>
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
