import { PlaceHolderImages } from './placeholder-images';
import { Users, Camera, Palette, UtensilsCrossed, CalendarDays, Landmark } from 'lucide-react';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400';
const getHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || 'placeholder';

export const categories = [
  { name: 'Guides', icon: Users, href: '#' },
  { name: 'Photographers', icon: Camera, href: '#' },
  { name: 'Artists', icon: Palette, href: '#' },
  { name: 'Food', icon: UtensilsCrossed, href: '#' },
  { name: 'Events', icon: CalendarDays, href: '#' },
  { name: 'Attractions', icon: Landmark, href: '#' },
];

export const recommendedBandhus = [
  {
    id: '1',
    name: 'Rohan Sharma',
    service: 'City Guide',
    rate: 15,
    rating: 4.9,
    reviews: 124,
    verified: true,
    image: getImage('bandhu1'),
    imageHint: getHint('bandhu1'),
    bio: "Passionate historian and storyteller, born and raised in Delhi. I'll show you the hidden gems and tales behind the city's iconic landmarks. Let's explore the soul of India together!",
    languages: ['English', 'Hindi', 'Punjabi'],
    skills: ['History Buff', 'Street Food Expert', 'Photography'],
    photos: [getImage('gallery1'), getImage('gallery2'), getImage('gallery3')]
  },
  {
    id: '2',
    name: 'Priya Singh',
    service: 'Photographer',
    rate: 25,
    rating: 4.8,
    reviews: 88,
    verified: true,
    image: getImage('bandhu2'),
    imageHint: getHint('bandhu2'),
    bio: "Capturing moments is my passion. Whether it's a portrait session against a stunning backdrop or candid street photography, I'll make your memories last a lifetime. I love finding unique angles and lighting.",
    languages: ['English', 'Hindi'],
    skills: ['Portrait Photography', 'Street Photography', 'Photo Editing'],
    photos: [getImage('gallery4'), getImage('gallery5'), getImage('gallery6')]
  },
  {
    id: '3',
    name: 'Ankit Desai',
    service: 'Local Artist',
    rate: 20,
    rating: 4.7,
    reviews: 56,
    verified: false,
    image: getImage('bandhu3'),
    imageHint: getHint('bandhu3'),
    bio: "Join me for a pottery workshop or a live painting session. I believe art is a universal language, and I love sharing traditional techniques with travelers from all over the world.",
    languages: ['English', 'Gujarati'],
    skills: ['Pottery', 'Mural Painting', 'Art History'],
    photos: [getImage('gallery7'), getImage('gallery8'), getImage('gallery9')]
  },
  {
    id: '4',
    name: 'Sunita Gupta',
    service: 'Food Expert',
    rate: 18,
    rating: 4.9,
    reviews: 210,
    verified: true,
    image: getImage('bandhu4'),
    imageHint: getHint('bandhu4'),
    bio: "They say the way to the heart is through the stomach, and I'm here to prove it! I run a cooking class and food tours, introducing you to the authentic flavors of my home.",
    languages: ['English', 'Hindi'],
    skills: ['Cooking Classes', 'Food Tours', 'Spice Knowledge'],
    photos: [getImage('gallery10'), getImage('gallery11'), getImage('gallery12')]
  },
];

export const topFoods = [
  { id: '1', title: 'Chole Bhature', description: 'A classic North Indian breakfast.', image: getImage('food1'), imageHint: getHint('food1') },
  { id: '2', title: 'Masala Dosa', description: 'Crispy South Indian crepe.', image: getImage('food2'), imageHint: getHint('food2') },
  { id: '3', title: 'Vada Pav', description: 'The quintessential Mumbai street food.', image: getImage('food3'), imageHint: getHint('food3') },
  { id: '4', title: 'Jalebi', description: 'Sweet, crispy, and syrupy spirals.', image: getImage('food4'), imageHint: getHint('food4') },
];

export const nearbyEvents = [
  { id: '1', title: 'Diwali Festival of Lights', description: 'City-wide celebrations.', image: getImage('event1'), imageHint: getHint('event1') },
  { id: '2', title: 'Sufi Music Night', description: 'Soulful music at Nizamuddin.', image: getImage('event2'), imageHint: getHint('event2') },
  { id: '3', title: 'India Art Fair', description: 'Contemporary art exhibition.', image: getImage('event3'), imageHint: getHint('event3') },
  { id: '4', title: 'Qutub Festival', description: 'Classical music and dance.', image: getImage('event4'), imageHint: getHint('event4') },
];

export const mustVisitAttractions = [
  { id: '1', title: 'Taj Mahal', description: 'An ivory-white marble mausoleum.', image: getImage('attraction1'), imageHint: getHint('attraction1') },
  { id: '2', title: 'Humayun\'s Tomb', description: 'The tomb of the Mughal Emperor.', image: getImage('attraction2'), imageHint: getHint('attraction2') },
  { id: '3', title: 'Qutub Minar', description: 'A towering minaret and victory tower.', image: getImage('attraction3'), imageHint: getHint('attraction3') },
];
