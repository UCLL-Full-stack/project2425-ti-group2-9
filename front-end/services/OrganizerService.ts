const getAllOrganizers = async () => {
    const user =  sessionStorage.getItem("loggedInUser")
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/organizers",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`
        } 
    })
};

const OrganizerService = {
    getAllOrganizers,
}

export default OrganizerService;