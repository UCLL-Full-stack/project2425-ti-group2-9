const getAllSpeakers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/speakers",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        } 
    })
};

const SpeakerService = {
    getAllSpeakers,
}

export default SpeakerService;