import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { StatusMessage, Event } from '@types'; // Adjust import path as needed
import EventService from '@services/EventService'; // Adjust import path as needed

const EventForm: React.FC = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<Event>({
    name: '',
    description: '',
    category: '',
    startDate: new Date(),
    endDate: new Date(),
    organizer: { id: 0, user: { username: '', email: '' }, companyName: '', events: [] }, // Adjust the default values as needed
    speakers: [],
  });

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

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

  const handleOrganizerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      organizer: { ...prevData.organizer, id: Number(e.target.value) },
    }));
  };

  const handleAddSpeaker = (speakerId: number) => {
    setFormData((prevData) => ({
      ...prevData,
      speakers: [...prevData.speakers, { id: speakerId, user: { username: '', email: '' }, expertise: '' }],
    }));
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
          Organizer ID:
          <input type="number" value={formData.organizer.id} onChange={handleOrganizerChange} required />
        </label>
        <label>
          Speaker IDs:
          <input type="number" placeholder="Enter Speaker ID" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSpeaker(Number(e.currentTarget.value));
              e.currentTarget.value = '';
            }
          }} />
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
