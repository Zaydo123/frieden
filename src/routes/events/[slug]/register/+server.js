import { pb } from '$lib/pocketbase';
import { env } from '$env/dynamic/private';

export async function POST({ request, params }) {
    const { slug } = params;
    const body = await request.json();  // This replaces the custom streamToJson function

    try {
        const event = await pb.collection('Events').getOne(slug);
        const {
            TShirtsProvided, GroupMinimumSize, GroupMaximumSize,
            IndividualCost, GroupCost, TeamRequired, RegistrationDeadline
        } = event;

        const registrationDeadline = new Date(RegistrationDeadline);
        if (registrationDeadline < new Date()) {
            return new Response('Registration deadline has passed', { status: 400 });
        }

        if (TeamRequired && (body.members.length < GroupMinimumSize || body.members.length > GroupMaximumSize)) {
            return new Response(`Members count should be between ${GroupMinimumSize} and ${GroupMaximumSize}`, { status: 400 });
        }

        let totalCost = TeamRequired ? GroupCost : IndividualCost * body.members.length;
        if (totalCost !== body.totalCost) {
            return new Response('Total cost does not match', { status: 400 });
        }

        body.members.forEach((member) => {
            if (TShirtsProvided && !member.tShirtSize) {
                throw new Error('T-shirt size required');
            }
        });

        if(body.email) {
            //validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(body.email)) {
                return new Response('Invalid email', { status: 400 });
            } 

        } else {
            return new Response('Email required', { status: 400 });
        }

        if (!body.groupName) {
            return new Response('Group name required', { status: 400 });
        }

        await pb.admins.authWithPassword(env.PRIVATE_PB_ADMIN_EMAIL, env.PRIVATE_PB_ADMIN_PASSWORD);

        await pb.collection('EventRegistrations').create({
            Event: slug,
            Email: body.email,
            GroupName: body.groupName,
            Attendees: body.members,
            TotalCost: totalCost,
            Paid: false
        });

        return new Response('Registered', { status: 200 });
    } catch (err) {

        return new Response(err.message, { status: 400 });
    }

    
}
