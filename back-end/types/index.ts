type Role = 'admin' | 'organizer' | 'speaker' | 'participant';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type OrganizerInput = {
    id?: number;
    user: UserInput;
    companyName: string;
    events?: EventInput[];
};

type SpeakerInput = {
    id?: number;
    user: UserInput;
    expertise: string;
    events?: EventInput[];
};

type ParticipantInput = {
    id?: number;
    user: UserInput;
    dateOfBirth: Date;
    events?: EventInput[];
};

type EventInput = {
    id?: number;
    name: string;
    description: string;
    category: string;
    startDate: Date;
    endDate: Date;
    organizer: OrganizerInput;
    speakers: SpeakerInput[];
    participants?: ParticipantInput[];
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};


export { 
    Role,
    UserInput,
    OrganizerInput,
    SpeakerInput,
    ParticipantInput,
    EventInput,
    AuthenticationResponse
};