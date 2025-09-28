'use server';
/**
 * @fileOverview Provides personalized itinerary suggestions for travelers based on their interests and real-time local data.
 *
 * - intelligentItinerarySuggestions - A function that generates personalized itinerary suggestions.
 * - IntelligentItinerarySuggestionsInput - The input type for the intelligentItinerarySuggestions function.
 * - IntelligentItinerarySuggestionsOutput - The return type for the intelligentItinerarySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentItinerarySuggestionsInputSchema = z.object({
  interests: z
    .string()
    .describe('A comma-separated list of the traveler\u0027s interests.'),
  location: z.string().describe('The current location of the traveler.'),
  duration: z
    .string()
    .describe('The desired duration of the itinerary (e.g., \"1 day\", \"3 days\").'),
  travelStyle: z
    .string()
    .optional()
    .describe(
      'The traveler\u0027s preferred travel style (e.g., \"budget-friendly\", \"luxury\").'
    ),
});
export type IntelligentItinerarySuggestionsInput = z.infer<
  typeof IntelligentItinerarySuggestionsInputSchema
>;

const IntelligentItinerarySuggestionsOutputSchema = z.object({
  itinerary: z.string().describe('A personalized itinerary for the traveler.'),
});
export type IntelligentItinerarySuggestionsOutput = z.infer<
  typeof IntelligentItinerarySuggestionsOutputSchema
>;

export async function intelligentItinerarySuggestions(
  input: IntelligentItinerarySuggestionsInput
): Promise<IntelligentItinerarySuggestionsOutput> {
  return intelligentItinerarySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentItinerarySuggestionsPrompt',
  input: {schema: IntelligentItinerarySuggestionsInputSchema},
  output: {schema: IntelligentItinerarySuggestionsOutputSchema},
  prompt: `You are an expert travel guide specializing in creating personalized itineraries.

  Based on the traveler's interests, location, desired duration, and travel style, create a unique and authentic itinerary.

  Interests: {{{interests}}}
  Location: {{{location}}}
  Duration: {{{duration}}}
  Travel Style: {{{travelStyle}}}

  Itinerary:`,
});

const intelligentItinerarySuggestionsFlow = ai.defineFlow(
  {
    name: 'intelligentItinerarySuggestionsFlow',
    inputSchema: IntelligentItinerarySuggestionsInputSchema,
    outputSchema: IntelligentItinerarySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
