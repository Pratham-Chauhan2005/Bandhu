import { PlaceHolderImages } from './placeholder-images';
import { Users, Camera, Palette, UtensilsCrossed, CalendarDays, Landmark, Home } from 'lucide-react';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400';
const getHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || 'placeholder';

export const categories = [
  { name: 'Guides', icon: Users, href: '/category/guides' },
  { name: 'Photographers', icon: Camera, href: '/category/photographers' },
  { name: 'Artists', icon: Palette, href: '/category/artists' },
  { name: 'Food', icon: UtensilsCrossed, href: '/category/food' },
  { name: 'Events', icon: CalendarDays, href: '/category/events' },
  { name: 'Attractions', icon: Landmark, href: '/category/attractions' },
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
  { id: '1', title: 'Chole Bhature', description: 'A classic North Indian breakfast.', image: getImage('food1'), imageHint: getHint('food1'), price: 3 },
  { id: '2', title: 'Masala Dosa', description: 'Crispy South Indian crepe.', image: getImage('food2'), imageHint: getHint('food2'), price: 2 },
  { id: '3', title: 'Vada Pav', description: 'The quintessential Mumbai street food.', image: getImage('food3'), imageHint: getHint('food3'), price: 1 },
  { id: '4', title: 'Jalebi', description: 'Sweet, crispy, and syrupy spirals.', image: getImage('food4'), imageHint: getHint('food4'), price: 2 },
];

export const nearbyEvents = [
  { id: '1', title: 'Diwali Festival of Lights', description: 'City-wide celebrations.', image: getImage('event1'), imageHint: getHint('event1'), date: 'Nov 12, 2024' },
  { id: '2', title: 'Sufi Music Night', description: 'Soulful music at Nizamuddin.', image: getImage('event2'), imageHint: getHint('event2'), date: 'Fridays, 8 PM' },
  { id: '3', title: 'India Art Fair', description: 'Contemporary art exhibition.', image: getImage('event3'), imageHint: getHint('event3'), date: 'Feb 1-4, 2025' },
  { id: '4', title: 'Qutub Festival', description: 'Classical music and dance.', image: getImage('event4'), imageHint: getHint('event4'), date: 'Dec 15-19, 2024' },
];

export const mustVisitAttractions = [
  { id: '1', title: 'Taj Mahal', description: 'An ivory-white marble mausoleum.', image: getImage('attraction1'), imageHint: getHint('attraction1') },
  { id: '2', title: 'Humayun\'s Tomb', description: 'The tomb of the Mughal Emperor.', image: getImage('attraction2'), imageHint: getHint('attraction2') },
  { id: '3', title: 'Qutub Minar', description: 'A towering minaret and victory tower.', image: getImage('attraction3'), imageHint: getHint('attraction3') },
];

export const homestays = [
  { id: '1', name: 'Cozy Garden Retreat', price: 45, distance: 2.5, rating: 4.8, image: getImage('homestay1'), imageHint: getHint('homestay1') },
  { id: '2', name: 'Urban Oasis Studio', price: 60, distance: 1.2, rating: 4.9, image: getImage('homestay2'), imageHint: getHint('homestay2') },
  { id: '3', name: 'Riverside Cottage', price: 75, distance: 5.1, rating: 4.7, image: getImage('homestay3'), imageHint: getHint('homestay3') },
  { id: '4', name: 'The Artist\'s Loft', price: 55, distance: 3.0, rating: 4.6, image: getImage('homestay4'), imageHint: getHint('homestay4') },
];
