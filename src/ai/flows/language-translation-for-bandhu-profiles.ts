'use server';

/**
 * @fileOverview A flow for translating Bandhu profiles to a user's native language.
 *
 * - languageTranslationForBandhuProfiles - A function that handles the translation process.
 * - LanguageTranslationForBandhuProfilesInput - The input type for the languageTranslationForBandhuProfiles function.
 * - LanguageTranslationForBandhuProfilesOutput - The return type for the languageTranslationForBandhuProfiles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LanguageTranslationForBandhuProfilesInputSchema = z.object({
  textToTranslate: z.string().describe('The text to translate, such as a Bandhu profile description.'),
  targetLanguage: z.string().describe('The target language for the translation (e.g., "es" for Spanish, "fr" for French).'),
});
export type LanguageTranslationForBandhuProfilesInput = z.infer<typeof LanguageTranslationForBandhuProfilesInputSchema>;

const LanguageTranslationForBandhuProfilesOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type LanguageTranslationForBandhuProfilesOutput = z.infer<typeof LanguageTranslationForBandhuProfilesOutputSchema>;

export async function languageTranslationForBandhuProfiles(
  input: LanguageTranslationForBandhuProfilesInput
): Promise<LanguageTranslationForBandhuProfilesOutput> {
  return languageTranslationForBandhuProfilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'languageTranslationForBandhuProfilesPrompt',
  input: {schema: LanguageTranslationForBandhuProfilesInputSchema},
  output: {schema: LanguageTranslationForBandhuProfilesOutputSchema},
  prompt: `You are a translation expert. Translate the following text into the specified language:

Text to translate: {{{textToTranslate}}}

Target language: {{{targetLanguage}}}

Translation:`,
});

const languageTranslationForBandhuProfilesFlow = ai.defineFlow(
  {
    name: 'languageTranslationForBandhuProfilesFlow',
    inputSchema: LanguageTranslationForBandhuProfilesInputSchema,
    outputSchema: LanguageTranslationForBandhuProfilesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
