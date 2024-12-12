import { UnauthorizedError } from 'express-jwt';
import { Organizer } from '../model/organizer';
import organizerDb from '../repository/organizer.db';
import {Role } from '../types';

const getAllOrganizers = async ({
    username,
    role,
    }:{
        username: string;
        role:Role
    }):Promise <Organizer[]> => {
    if(role === 'admin'|| role === 'organizer') {
        return await organizerDb.getAllOrganizers();
    } else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getOrganizerById = async({id, username, role}
    :{id: number; username: string; role: Role})
    :Promise<Organizer> => {
    if(role === 'admin' || role === 'organizer'){
        const organizer = await organizerDb.getOrganizerById({id});
        if (!organizer) {
            throw new Error(`Organizer with id ${id} not found.`);
        }
        return organizer;
    }else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
    
};

export default {
    getAllOrganizers,
    getOrganizerById,
};
