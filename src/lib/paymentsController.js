import { pb } from './pbConnection';

export const createEventPayment = async (user, event, EventGroup, paymentDate, receiptURL, providerID) => {
    try {
        const result = await pb.collection('EventPayments').create({
            User: user,
            Event: event,
            EventGroup: EventGroup,
            PaymentDate: paymentDate,
            ReceiptURL: receiptURL,
            ProviderID: providerID
        });

        return result;
    } catch (e) {
        console.log(e);
        return [];
    }
}


export const getEventPayment = async (id) => {
    try {
        const result = await pb.collection('EventPayments').getOne(id, {
            expand: 'relField1,relField2.subRelField',
        });
        return result;
    } catch (e) {
        console.log(e);
        return [];
    }

}

export const getEventPayments = async () => {
    try {
        const result = await pb.collection('EventPayments').getFullList({
            sort: '-created',
        });
        return result;
    } catch (e) {
        console.log(e);
        return [];
    }
}
