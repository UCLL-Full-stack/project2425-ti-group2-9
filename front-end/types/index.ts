export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type Organizer = {
    id?: number;
    user: User;
    companyName: string;
    events?: Event[];
}

export type Speaker = {
    id?: number;
    user: User;
    expertise: string;
    events?: Event[];
};

export type Participant = {
    id?: number;
    user: User;
    dateOfBirth: Date;
    events?: Event[];
};

export type Event = {
    id?: number;
    name: string;
    description: string;
    category: string;
    startDate: Date;
    endDate: Date;
    organizer: Organizer;
    speakers: Speaker[];
    // participants?: ParticipantInput[];
};

export type User = {
    firstName?: string;
    lastName?: string;
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
  };