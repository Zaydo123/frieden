import { pb } from '$lib/pocketbase';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
    try {
        // Get chapter by slug
        const records = await pb.collection('Chapters').getList(1, 1, {
            filter: `Slug = "${params.slug}" && Active = true`
        });
        
        if (records.items.length === 0) {
            throw error(404, 'Chapter not found');
        }
        
        const chapter = records.items[0];
        
        // Transform the Logo URL if it exists
        if (chapter.Logo) {
            chapter.LogoUrl = pb.getFileUrl(chapter, chapter.Logo);
        }
        
        return json(chapter);
    } catch (err) {
        console.error('Error fetching chapter:', err);
        throw error(404, 'Chapter not found');
    }
} 