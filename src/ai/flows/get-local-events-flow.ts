
'use server';
/**
 * @fileOverview Provides a list of local events for a given location.
 *
 * - getLocalEvents - A function that generates a list of local events.
 * - GetLocalEventsInput - The input type for the getLocalEvents function.
 * - GetLocalEventsOutput - The return type for the getLocalEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {EventSchema} from '@/ai/schemas';

const GetLocalEventsInputSchema = z.object({
  location: z.string().describe('The city and state to get events for (e.g., "Gwalior, India").'),
});
export type GetLocalEventsInput = z.infer<typeof GetLocalEventsInputSchema>;

const GetLocalEventsOutputSchema = z.object({
  events: z.array(EventSchema),
});
export type GetLocalEventsOutput = z.infer<typeof GetLocalEventsOutputSchema>;

export async function getLocalEvents(
  input: GetLocalEventsInput
): Promise<GetLocalEventsOutput> {
  return getLocalEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getLocalEventsPrompt',
  input: {schema: GetLocalEventsInputSchema},
  output: {schema: GetLocalEventsOutputSchema},
  prompt: `You are an expert local guide. Given a location, provide a list of the top 3-5 interesting and current or upcoming events, festivals, or local happenings. The events should be relevant to today's date.

  Location: {{{location}}}
  Current Date: ${new Date().toDateString()}

  Generate a list of 3 to 5 events. For each event, provide a title, a short description, a beautiful, high-quality image URL from Unsplash, a two-word hint for the image, its latitude and longitude, date, and time.
  `,
});

const getLocalEventsFlow = ai.defineFlow(
  {
    name: 'getLocalEventsFlow',
    inputSchema: GetLocalEventsInputSchema,
    outputSchema: GetLocalEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
