import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    try {
        // Fetch the chapter based on the slug
        const response = await fetch(`/api/chapters/${params.slug}`);
        
        if (!response.ok) {
            throw error(404, {
                message: 'Chapter not found'
            });
        }
        
        const chapter = await response.json();
        
        return {
            chapter,
            slug: params.slug
        };
    } catch (err) {
        console.error('Error loading chapter:', err);
        throw error(404, {
            message: 'Chapter not found'
        });
    }
} 