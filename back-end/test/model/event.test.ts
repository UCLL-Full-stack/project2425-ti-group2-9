import { set } from "date-fns";
import { Event } from "../../model/event";
import { Speaker } from "../../model/speaker";
import { Organizer } from "../../model/organizer";
import { Participant } from "../../model/participant";
import { User } from "../../model/user";

const name = "FUll-stack Workshop";
const description = "a workshop to learn full stack";
const category = "development";

const startDate = set(new Date(), { year: 2024, month: 1, date: 12 });
const endDate = set(new Date(), { year: 2024, month: 1, date: 13 });

const userOrganizer = new User({
    username: 's',
    firstName: 'Senne',
    lastName: 'Geerts',
    email: 'senne@mail.com',
    password: 'z',
    role: 'organizer',
});

const userSpeaker = new User({
    username: 'j',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@mail.com',
    password: 'x',
    role:'speaker',
 });

const userParticipant = new User({
   username: 'p',
   firstName: 'Peter',
   lastName: 'Smith',
   email: 'peter@mail.com',
   password: 'y',
   role: 'participant',
});

const organizer = new Organizer({
   user: userOrganizer,
   companyName: 'Tech Innovation Hub',
   events: [],
});

const speaker = new Speaker({
   user: userSpeaker,
   expertise: 'JavaScript',
   
});

const participant = new Participant({
   user: userParticipant,
   dateOfBirth: new Date('1990-01-01'),
   
});

const event = new Event({
   name,
   description,
   category,
   startDate,
   endDate,
   organizer,
   speakers: [speaker],
   participants: [participant],
});

test('given: valid values for an event, when event is created, then event is created with those values', () => {   
   //given: create a new event
   const event = new Event({
      name,
      description,
      category,
      startDate,
      endDate,
      organizer,
      speakers: [speaker],
      participants: [participant],
   });
   //then: assert that the event has the given values
   expect(event.getName()).toEqual(name);
   expect(event.getDescription()).toEqual(description);
   expect(event.getCategory()).toEqual(category);
   expect(event.getStartDate()).toEqual(startDate);
   expect(event.getEndDate()).toEqual(endDate);
   expect(event.getOrganizer()).toEqual(organizer);
   expect(event.getSpeakers()).toEqual([speaker]);
   expect(event.getParticipants()).toEqual([participant]);
});

test(' given empty eventName, when creating event, throws an error', () => {
  //given
  const invalidName = "";
  //when: creating the event
  const createdEvent = () => new Event({
     name: invalidName,
     description,
     category,
     startDate,
     endDate,
     organizer,
     speakers: [speaker],
     participants: [participant],
  });
  expect(createdEvent).toThrow('Event name is required');
});

test(' given empty description, when creating event, throws an error', () => {
   //given
   const invalidDescription = "";
   //when: creating the event
   const createdEvent = () => new Event({
      name,
      description: invalidDescription,
      category,
      startDate,
      endDate,
      organizer,
      speakers: [speaker],
      participants: [participant],
   });
   expect(createdEvent).toThrow('Event description is required');
});

test(' given startdate greater then end date, when creating event, throws an error', () => {
  //given: 
  const invalidStartDate = set(new Date(), { year: 2024, month: 1, date: 15 });
  const invalidEndDate = set(new Date(), { year: 2024, month: 1, date: 13 });
  //when: creating the event
  const createdEvent = () => new Event({
     name,
     description,
     category,
     startDate: invalidStartDate,
     endDate: invalidEndDate,
     organizer,
     speakers: [speaker],
     participants: [participant],
  });
  expect(createdEvent).toThrow('Start date and end date should be valid and the start date should be earlier than the end date');
});

test('giving existing event, when adding participant to event that is already participanting, then participant is added only once to that event and error is thrown',() =>{
   //given 
   const createdEvent = new Event({
      name,
      description,
      category,
      startDate,
      endDate,
      organizer,
      speakers: [speaker],
      participants: [participant]
   });
   //when participant add
   const addParticipant = () => createdEvent.addParticipantToEvent(participant);
   expect(addParticipant).toThrow('You are already registered to attend this event');
   expect(event.getParticipants()).toContain(participant);
   expect(event.getParticipants()).toHaveLength(1);
});
