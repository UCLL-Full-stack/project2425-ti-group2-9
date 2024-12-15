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
    })
}

const getAllEvents = async () => {
    const user = sessionStorage.getItem("loggedInUser") ;
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/events',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    })
}

const EventService = {
    createEvent,
    getAllEvents
}

export default EventService;