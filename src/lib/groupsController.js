import { pb } from './pbConnection';


export const createGroup = async (name, members, event, inviteURL, inviteOnly, invitePin, paid, groupLogo, groupLeader, transactions) => {
    try {
        const result = await pb.collection('EventGroups').create({
            GroupName: name,
            Members: members,
            Event: event,
            InviteURL: inviteURL,
            InviteOnly: inviteOnly,
            InvitePin: invitePin,
            Paid: paid,
            GroupLogo: groupLogo,
            GroupLeader: groupLeader,
            Transactions: transactions
        });

        return result;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getEventGroup = async (id) => {
    try {
        const result = await pb.collection('EventGroups').getOne(id, {
            expand: 'relField1,relField2.subRelField',
        });
        return result;
    } catch (e) {
        console.log(e);
        return [];
    }

};