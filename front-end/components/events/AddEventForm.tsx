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
  const [speakers, setSpeakers] = useState<Speaker[]>([]); // State to hold speakers

  const clearMessages = () => {
    setStatusMessages([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrganizerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrganizerId = Number(e.target.value);
    const selectedOrganizer = organizers.find(org => org.id === selectedOrganizerId);
    if (selectedOrganizer) {
      setFormData((prevData) => ({
        ...prevData,
        organizer: selectedOrganizer,
      }));
    }
  };

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeakerId = Number(e.target.value);
    const selectedSpeaker = speakers.find(sp => sp.id === selectedSpeakerId);
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
        setStatusMessages([{ message: t('event.success'), type: 'success' }]);
        // Reset form or perform any other actions after successful submission
      } else {
        const errorData = await response.json();
        setStatusMessages([{ message: errorData.errorMessage || t('general.error'), type: 'error' }]);
      }
    } catch (error) {
      setStatusMessages([{ message: t('general.error'), type: 'error' }]);
    }
  };

  // Fetch all organizers on component mount
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
        const response = await SpeakerService.getAllSpeakers(); // Adjust according to your API service
        if (response.ok) {
          const data = await response.json();
          setSpeakers(data); // Assuming the response is an array of speakers
        } else {
          setStatusMessages([{ message: t('general.error'), type: 'error' }]);
        }
      } catch (error) {
        setStatusMessages([{ message: t('general.error'), type: 'error' }]);
      }
    };

    fetchOrganizers();
    fetchSpeakers();
  }, [t]);

  return (
    <div>
      <h3>{t('event.title')}</h3>
      {statusMessages.length > 0 && (
        <ul className="list-none">
          {statusMessages.map(({ message, type }, index) => (
            <li key={index} className={classNames({ 'text-red-800': type === 'error', 'text-green-800': type === 'success' })}>
              {message}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Start Date:
          <input type="datetime-local" name="startDate" onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })} required />
        </label>
        <label>
          End Date:
          <input type="datetime-local" name="endDate" onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })} required />
        </label>
        <label>
          Organizer:
          <select onChange={handleOrganizerChange} required>
            <option value="">Select an Organizer</option>
            {organizers.map((organizer) => (
              <option key={organizer.id} value={organizer.id}>
                {organizer.companyName} (ID: {organizer.id})
              </option>
            ))}
          </select>
        </label>
        <label>
          Speakers:
          <select onChange={handleSpeakerChange} multiple>
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.user.firstName} {speaker.user.lastName}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
