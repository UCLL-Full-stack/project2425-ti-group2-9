const createEvent = async (formData: any) => {
    const user =  localStorage.getItem("loggedInUser")
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

const EventService = {
    createEvent,
}

export default EventService;