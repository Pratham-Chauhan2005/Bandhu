import {z} from 'genkit';

export const AttractionSchema = z.object({
  id: z.string(),
  title: z.string().describe('The name of the attraction.'),
  description: z
    .string()
    .describe('A short, compelling description of the attraction.'),
  image: z.string().optional().describe('A URL to an image of the attraction.'),
  imageHint: z
    .string()
    .optional()
    .describe('A two-word hint for a placeholder image.'),
  latitude: z.number().describe('The latitude of the attraction.'),
  longitude: z.number().describe('The longitude of the attraction.'),
  hours: z.string().optional().describe('The opening and closing hours (e.g., "10:00 AM - 5:00 PM").'),
  price: z.string().optional().describe('The entrance fee or ticket price (e.g., "₹500 for foreigners", "Free").'),
});
export type Attraction = z.infer<typeof AttractionSchema>;

export const EventSchema = z.object({
    id: z.string().describe('A unique ID for the event.'),
    title: z.string().describe('The title of the event.'),
    description: z.string().describe('A short description of the event.'),
    image: z.string().optional().describe('A URL to an image for the event.'),
    imageHint: z.string().optional().describe('A two-word hint for a placeholder image.'),
    date: z.string().describe('The date of the event (e.g., "Nov 12", "Fridays").'),
    time: z.string().optional().describe('The time of the event (e.g., "8:00 PM", "All Day").'),
    latitude: z.number().describe('The latitude of the event location.'),
    longitude: z.number().describe('The longitude of the event location.'),
});
export type Event = z.infer<typeof EventSchema>;
