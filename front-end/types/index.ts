export type Organizer = {
    id: number;
    user: User;
    companyName: string;
    events: Event[];
}

export type Event = {
    id?: number;
    name: string;
    description: string;
    category: string;
    startDate: Date;
    endDate: Date;
    organizer: Organizer;
    // speakers: SpeakerInput[];
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