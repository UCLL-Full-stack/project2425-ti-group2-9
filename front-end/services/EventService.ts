import {Event, Participant} from '@types'
const createEvent = async (formData: any) => {
    const user =  sessionStorage.getItem("loggedInUser")
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/events',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });
};

const getAllEvents = async () => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/events',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    });
};

const getEventByName = async(eventName: string) => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/events/name/${eventName}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    });
};

const getEventByID = async(id: string) => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/events/${id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    });
};

const deleteEvent = async(event: Event) => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    const eventId = event.id;
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/events/${eventId}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    });
}

const attendingEvent = async (event: Event) => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/events/attending',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify({
            event,
        }),      
    });
};

const updateEvent = async (name: string, event: Event) =>{
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    const id = event.id;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/update/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
             Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
        }),
    });
};

const EventService = {
    createEvent,
    getAllEvents,
    attendingEvent,
    getEventByName,
    deleteEvent,
    updateEvent,
    getEventByID
}

export default EventService;