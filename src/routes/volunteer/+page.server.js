import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

let schema = z.object({
    name: z.string().default(''),
    email: z.string().email().min(5).max(50).default(''),
    phone: z.string().min(3).max(15).default(''),
    typeOfVolunteer: z.string().min(1).max(20).default('Volunteer'),
    position: z.string().max(50).default('').optional(),
});



export const load = async () => {
    const form = await superValidate(schema);
    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, schema);
        //const formData = await request.formData();
        console.log('POST', form);


        if (!form.valid) {
            return fail(400, { form });
        }

        //const file = formData.get('file');
        //if (file instanceof File) {
        //    console.log('File', file);
        //}
    


        return { form };
    
    }
};
