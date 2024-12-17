const getParticipantByUsername = async (username:string) => {
    const user =  sessionStorage.getItem("loggedInUser")
    const token = user ? JSON.parse(user).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/participants/${username}`,{
        
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             Authorization:  `Bearer ${token}`
        },
    });
}

const ParticipantService = {
    getParticipantByUsername
}

export default ParticipantService