
'use server';
/**
 * @fileOverview Provides a list of famous local food places for a given location.
 *
 * - getLocalFoodShops - A function that generates a list of food shops.
 * - GetLocalFoodShopsInput - The input type for the getLocalFoodShops function.
 * - GetLocalFoodShopsOutput - The return type for the getLocalFoodShops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {FoodShopSchema} from '@/ai/schemas';

const GetLocalFoodShopsInputSchema = z.object({
  location: z.string().describe('The city and state to get food shops for (e.g., "Jaipur, India").'),
});
export type GetLocalFoodShopsInput = z.infer<typeof GetLocalFoodShopsInputSchema>;

const GetLocalFoodShopsOutputSchema = z.object({
  foodShops: z.array(FoodShopSchema),
});
export type GetLocalFoodShopsOutput = z.infer<typeof GetLocalFoodShopsOutputSchema>;

export async function getLocalFoodShops(
  input: GetLocalFoodShopsInput
): Promise<GetLocalFoodShopsOutput> {
  return getLocalFoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getLocalFoodPrompt',
  input: {schema: GetLocalFoodShopsInputSchema},
  output: {schema: GetLocalFoodShopsOutputSchema},
  prompt: `You are an expert food blogger and local guide. Given a location, provide a list of 5-7 famous and highly-rated local food shops or street food stalls. These should be iconic places known for their authentic local cuisine.

  Location: {{{location}}}

  For each food shop, provide its name, a short description, a beautiful, high-quality image URL from Unsplash, a two-word hint for the image, its latitude, longitude, and an estimated rating out of 5.
  `,
});

const getLocalFoodFlow = ai.defineFlow(
  {
    name: 'getLocalFoodFlow',
    inputSchema: GetLocalFoodShopsInputSchema,
    outputSchema: GetLocalFoodShopsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
