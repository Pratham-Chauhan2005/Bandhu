
'use server';

import { intelligentItinerarySuggestions, type IntelligentItinerarySuggestionsInput, type IntelligentItinerarySuggestionsOutput } from '@/ai/flows/intelligent-itinerary-suggestions';
import { languageTranslationForBandhuProfiles, type LanguageTranslationForBandhuProfilesInput } from '@/ai/flows/language-translation-for-bandhu-profiles';
import { getAttractions, type GetAttractionsInput, type GetAttractionsOutput } from '@/ai/flows/get-attractions-flow';
import { getLocalEvents, type GetLocalEventsInput, type GetLocalEventsOutput } from '@/ai/flows/get-local-events-flow';

export async function getItinerary(input: IntelligentItinerarySuggestionsInput): Promise<IntelligentItinerarySuggestionsOutput> {
    try {
        const result = await intelligentItinerarySuggestions(input);
        return result;
    } catch (error) {
        console.error(error);
        return { title: 'Error', itinerary: [{ time: 'Now', title: 'Could not generate itinerary', description: 'Sorry, I was unable to generate an itinerary at this time. Please try again later.' }] };
    }
}

export async function getTranslation(input: LanguageTranslationForBandhuProfilesInput) {
    try {
        const result = await languageTranslationForBandhuProfiles(input);
        return result.translatedText;
    } catch (error) {
        console.error(error);
        return 'Translation failed.';
    }
}

export async function getAttractionsByLocation(input: GetAttractionsInput): Promise<GetAttractionsOutput> {
    try {
        const result = await getAttractions(input);
        return result;
    } catch (error) {
        console.error(error);
        return { attractions: [] };
    }
}

export async function getEventsByLocation(input: GetLocalEventsInput): Promise<GetLocalEventsOutput> {
    try {
        const result = await getLocalEvents(input);
        // Fallback for image URLs if not provided by AI
        result.events.forEach((event: any, index: number) => {
            if (!event.image) {
                event.image = `https://picsum.photos/seed/event${index + 1}/600/400`;
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        return { events: [] };
    }
}
