'use server';

import { intelligentItinerarySuggestions, type IntelligentItinerarySuggestionsInput, type IntelligentItinerarySuggestionsOutput } from '@/ai/flows/intelligent-itinerary-suggestions';
import { languageTranslationForBandhuProfiles, type LanguageTranslationForBandhuProfilesInput } from '@/ai/flows/language-translation-for-bandhu-profiles';

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
