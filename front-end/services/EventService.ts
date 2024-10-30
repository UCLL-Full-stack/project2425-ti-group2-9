const createEvent = async (formData: any) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+'/events',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
}

const EventService = {
    createEvent,
}

export default EventService;