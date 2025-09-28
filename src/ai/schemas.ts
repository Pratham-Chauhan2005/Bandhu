import {z} from 'genkit';

export const AttractionSchema = z.object({
  id: z.string(),
  title: z.string().describe("The name of the attraction."),
  description: z.string().describe("A short, compelling description of the attraction."),
  image: z.string().optional().describe("A URL to an image of the attraction."),
  imageHint: z.string().optional().describe("A two-word hint for a placeholder image."),
});
export type Attraction = z.infer<typeof AttractionSchema>;
