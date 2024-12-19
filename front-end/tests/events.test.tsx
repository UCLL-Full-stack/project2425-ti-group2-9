import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EventOverviewTable from '../components/events/EventOverviewTable';
import EventService from '../services/EventService';

window.React = React

jest.mock('../services/EventService', () => ({
  attendingEvent: jest.fn(),
}));

// Mock events data

const organizer = {
    companyName: 'event company',
    user:{id: 1,username: 'johndoe',password: 'johnd123',firstName: 'John',lastName: 'Doe',email: 'john.doe1@mail.be',role: 'organizer',}
}

const speaker = {
    expertise: 'dev',
    user:{id: 2,username: 'speaker',password: 'speaker123',firstName: 'John',lastName: 'Speaker',email: 'john.speaker@mail.be',role: 'speaker',}
}

const participant = {
  dateOfBirth: new Date('2003-01-10'),
  user:{id: 3,username: 'participant',password: 'participant123',firstName: 'John',lastName: 'participant',email: 'john.participant@mail.be',role: 'participant',}
}
const events = [
  {
    id: 1,
    name: 'Test Event',
    description: 'This is a test event',
    category: 'Tech',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-01-12'),
    organizer: organizer,
    speakers: [speaker],
    participant: []
  }
];

const eventWithParticipant = [
  {
    id: 1,
    name: 'Test Event',
    description: 'This is a test event',
    category: 'Tech',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-01-12'),
    organizer: organizer,
    speakers: [speaker],
    participant: [participant]
  }
];

let eventService: jest.Mock
eventService = jest.fn()

test('given event- when you want an overview - you get to see an overview of all events', () =>{
    //when
    render(<EventOverviewTable events={events}/>)
   
    //then
    expect(screen.getByText('Test Event'))
})

test('handles attending an event', () => {
  EventService.attendingEvent = eventService.mockResolvedValue(eventWithParticipant);

  const {rerender} = render(<EventOverviewTable events={events}/>)
  fireEvent.click(screen.getByTestId('attend-button-0'))
  rerender(<EventOverviewTable events={eventWithParticipant}/>)
})

