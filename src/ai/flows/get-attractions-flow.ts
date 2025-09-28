'use server';
/**
 * @fileOverview Provides a list of must-visit attractions for a given location.
 *
 * - getAttractions - A function that generates a list of attractions.
 * - GetAttractionsInput - The input type for the getAttractions function.
 * - GetAttractionsOutput - The return type for the getAttractions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {AttractionSchema} from '@/ai/schemas';

const GetAttractionsInputSchema = z.object({
  location: z.string().describe('The city or area to get attractions for.'),
});
export type GetAttractionsInput = z.infer<typeof GetAttractionsInputSchema>;

const GetAttractionsOutputSchema = z.object({
  attractions: z.array(AttractionSchema),
});
export type GetAttractionsOutput = z.infer<typeof GetAttractionsOutputSchema>;

export async function getAttractions(
  input: GetAttractionsInput
): Promise<GetAttractionsOutput> {
  return getAttractionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAttractionsPrompt',
  input: {schema: GetAttractionsInputSchema},
  output: {schema: GetAttractionsOutputSchema},
  prompt: `You are an expert travel guide. Given a location, provide a list of the top 3 most famous and visited attractions.

  Location: {{{location}}}

  Generate a list of 3 attractions. For each attraction, provide a title, a short description, and a beautiful, high-quality image URL from Unsplash.
  `,
});

const getAttractionsFlow = ai.defineFlow(
  {
    name: 'getAttractionsFlow',
    inputSchema: GetAttractionsInputSchema,
    outputSchema: GetAttractionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
