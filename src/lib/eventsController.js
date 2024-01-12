import { pb } from './pbConnection';

export const createEvent = async (eventDate, title, description, images, maxRegistrants, isPublic, registeredUsers, registrationDeadline, shareURL, location, pageContent, individualCost, groupCost, bannedUsers, teamRequired, groupMinimumSize, groupMaximumSize, groupDivisibleBy) => {
    try {
        const result = await pb.collection('Events').create({
            EventDate: eventDate,
            Title: title,
            Description: description,
            Images: images,
            MaxRegistrants: maxRegistrants,
            Public: isPublic,
            RegisteredUsers: registeredUsers,
            RegistrationDeadline: registrationDeadline,
            ShareURL: shareURL,
            Location: location,
            PageContent: pageContent,
            IndividualCost: individualCost,
            GroupCost: groupCost,
            BannedUsers: bannedUsers,
            TeamRequired: teamRequired,
            GroupMinimumSize: groupMinimumSize,
            GroupMaximumSize: groupMaximumSize,
            GroupDivisibleBy: groupDivisibleBy
        });

        return result;

    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const getEvent = async (id) => {
    try {
        const result = await pb.collection('Events').getOne(id, {
            expand: 'relField1,relField2.subRelField',
        });
        return result;
    } catch (e) {
        console.log(e);
        return [];
    }

};

export const getUpcomingEvents = async () => {
    try {
        const date = new Date();
        const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

        console.log(formattedDate);

        const resultList = await pb.collection('Events').getList(1, 100, {
            Registration_Deadline: `> ${formattedDate}`,
            sort: 'Registration_Deadline',
        });

        return resultList;
    } catch (e) {
        console.log(e);
    }

    return [];
};

