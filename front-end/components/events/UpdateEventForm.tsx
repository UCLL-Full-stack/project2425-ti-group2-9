import EventService from '@services/EventService'; 
import React, { useState } from 'react';

const UpdateEvent = () =>{
    // const [name, setName] = useState<string>('');
    // const [id, setId] = useState<string>('')
    // const [errors, setErrors] = useState<string[]>([]);
    // const [status, setStatus] = useState<string>('');

    // const validate = (): boolean => {
    //     let isValid = true;
    //     setErrors([]);
    //     if (!name.trim()) {
    //         setErrors((errors) => [...errors, 'Name is required']);
    //         isValid = false;
    //     }
    //     return isValid;
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!validate()) {
    //       return;
    //     }
    //     const response = await EventService.updateEvent(name);
    //     const data = await response.json();
    //     if (!response.ok) {
    //       setErrors((errors) => [...errors, data.message]);
    //     } else {
    //       setStatus('Event created successfully.');
    //     }
    // }
}