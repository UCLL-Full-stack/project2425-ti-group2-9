import { set } from "date-fns";
import { Participant } from "../../model/participant";
//import { Event } from "../model/event";

import { Organizer } from "../../model/organizer";
import { User } from "../../model/user";

const user = new User({
    username: "john.doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "participant"
});

const dateOfBirth = set(new Date(), { year: 2003, month: 1, date: 12 });

test('given: valid values for participant when: participant created, then particapnt has those values', () => {
    //when create participant
    const participant = new Participant({
        user,
        dateOfBirth,
    });
    //then participant expected with those values
    expect(participant.getUser()).toEqual(user);
    expect(participant.getDateOfBirth()).toEqual(dateOfBirth);
})