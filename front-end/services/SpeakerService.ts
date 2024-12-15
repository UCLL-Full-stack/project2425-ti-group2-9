const getAllSpeakers = async () => {
    const user =  sessionStorage.getItem("loggedInUser")
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/speakers",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`
        } 
    })
};

const SpeakerService = {
    getAllSpeakers,
}

export default SpeakerService;