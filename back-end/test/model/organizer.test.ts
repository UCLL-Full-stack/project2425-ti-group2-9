import { Organizer } from "../../model/organizer";
import { User } from "../../model/user";

const user = new User({
    username: "john.doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "organizer"
});
const companyName = 'EVENTING';

test('given: valid values for organizer when: organizer created, then organizer has those values', () => {
    const organizer = new Organizer({
        companyName,
        user,
    });

    expect(organizer.getUser()).toEqual(user);
    expect(organizer.getCompanyName()).toEqual(companyName);
})

test('given: empty value for company name when: organizer created, then organizer throws error', () => {
    //given
    const emptyCompanyName = '  ';
    //when
    const organizer = () => new Organizer({
        companyName: emptyCompanyName,
        user,
    });
    //then
    expect(organizer).toThrow("Company name is required");
})