import { UnauthorizedError } from "express-jwt";
import { Speaker } from "../model/speaker";
import speakerDb from "../repository/speaker.db";
import { Role } from "../types";


const getAllSpeakers = async({
    username,
    role
    }:{username:string; role:Role})
    :Promise<Speaker[]> => {
        if(role === 'admin' || role === 'organizer'){
            return await speakerDb.getAllSpeakers(); 
        }
        else{
            throw new UnauthorizedError('credentials_required', {
                message: 'You are not authorized to access this resource.',
            });
        }
    
};

export default {
    getAllSpeakers,
};
