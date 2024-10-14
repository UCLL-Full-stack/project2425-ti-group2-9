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
    events: [],
 });

 const participant = new Participant({
    user: userParticipant,
    dateOfBirth: new Date('1990-01-01'),
    events: [],
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
 })