const getAllOrganizers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/organizers",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        } 
    })
};

const OrganizerService = {
    getAllOrganizers,
}

export default OrganizerService;