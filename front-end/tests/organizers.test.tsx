import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import OrganizerOverviewTable from '../components/organizers/OrganizerOverviewTable';

const organizers = [
    {
        companyName: 'event company',
        user:{id: 1,username: 'johndoe',password: 'johnd123',firstName: 'John',lastName: 'Doe',email: 'john.doe1@mail.be',role: 'organizer',}
    },
    {
        companyName: 'Buisness',
        user:{id: 2,username: 'senne',password: 'senn123',firstName: 'Senne',lastName: 'Geerts',email: 'senne@mail.be',role: 'organizer',}
    }

]

test('given organizers when you want an overview - you get to see an overview of all organizers', () =>{
    //when
    render(<OrganizerOverviewTable organizers={organizers}/>)
   
    //then
    expect(screen.getByText('event company'))
    expect(screen.getByText('Buisness'))
    
})
