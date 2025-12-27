

import { PlaceHolderImages } from './placeholder-images';
import { Users, Camera, Palette, UtensilsCrossed, CalendarDays, Landmark, Home, Martini } from 'lucide-react';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400';
const getHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || 'placeholder';

export const categories = [
  { name: 'Guides', icon: Users, href: '/category/guides' },
  { name: 'Photographers', icon: Camera, href: '/category/photographers' },
  { name: 'Artists', icon: Palette, href: '/category/artists' },
  { name: 'Food', icon: UtensilsCrossed, href: '/category/food' },
  { name: 'Events', icon: CalendarDays, href: '/category/events' },
  { name: 'Attractions', icon: Landmark, href: '/category/attractions' },
  { name: 'Nightlife', icon: Martini, href: '/category/nightlife'}
];

export const recommendedBandhus = [
  {
    id: '1',
    name: 'Rohan Sharma',
    service: 'City Guide',
    rate: 150,
    rating: 4.9,
    reviews: 124,
    verified: true,
    image: getImage('bandhu1'),
    imageHint: getHint('bandhu1'),
    bio: "Passionate historian and storyteller, born and raised in Delhi. I'll show you the hidden gems and tales behind the city's iconic landmarks. Let's explore the soul of India together!",
    languages: ['English', 'Hindi', 'Punjabi'],
    skills: ['History Buff', 'Street Food Expert', 'Photography'],
    photos: [getImage('gallery1'), getImage('gallery2'), getImage('gallery3')],
    phone: '+911234567890',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Priya Singh',
    service: 'Photographer',
    rate: 250,
    rating: 4.8,
    reviews: 89,
    verified: true,
    image: getImage('bandhu2'),
    imageHint: getHint('bandhu2'),
    bio: "Capturing moments is my passion. I specialize in portrait and street photography, finding the beauty in everyday life. Let's create beautiful memories of your trip!",
    languages: ['English', 'Hindi'],
    skills: ['Portrait Photography', 'Street Photography', 'Photo Editing'],
    photos: [getImage('gallery4'), getImage('gallery5'), getImage('gallery6')],
    phone: '+912345678901',
    isAvailable: false,
  },
  {
    id: '5',
    name: 'Karan Johar',
    service: 'Nightlife Guide',
    rate: 200,
    rating: 4.7,
    reviews: 95,
    verified: false,
    image: getImage('bandhu5'),
    imageHint: getHint('bandhu5'),
    bio: "Experience the vibrant nightlife of Bangalore with me. I know the best clubs, pubs, and hidden spots to make your nights unforgettable.",
    languages: ['English', 'Hindi', 'Kannada'],
    skills: ['Club Hopping', 'Craft Cocktails', 'Local Events'],
    photos: [getImage('gallery25'), getImage('gallery26'), getImage('gallery27')],
    phone: '+915678901234',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Isha Verma',
    service: 'Local Artist',
    rate: 220,
    rating: 4.9,
    reviews: 72,
    verified: true,
    image: getImage('bandhu6'),
    imageHint: getHint('bandhu6'),
    bio: "A textile artist passionate about traditional Indian fabrics and weaving techniques. Join my workshops to create your own beautiful textile art.",
    languages: ['English', 'Hindi'],
    skills: ['Weaving', 'Block Printing', 'Textile History'],
    photos: [getImage('gallery16'), getImage('gallery17'), getImage('gallery18')],
    phone: '+916789012345',
    isAvailable: true,
  },
  {
    id: '7',
    name: 'Vikram Singh',
    service: 'Photographer',
    rate: 275,
    rating: 4.7,
    reviews: 65,
    verified: false,
    image: getImage('bandhu7'),
    imageHint: getHint('bandhu7'),
    bio: "I specialize in architectural and drone photography. Let's capture the grandeur of the city's monuments from a unique perspective.",
    languages: ['English', 'Punjabi'],
    skills: ['Drone Photography', 'Architecture', 'Videography'],
    photos: [getImage('gallery19'), getImage('gallery20'), getImage('gallery21')],
    phone: '+917890123456',
    isAvailable: false,
  },
  {
    id: '8',
    name: 'Neha Sharma',
    service: 'Local Artist',
    rate: 190,
    rating: 4.8,
    reviews: 88,
    verified: true,
    image: getImage('bandhu8'),
    imageHint: getHint('bandhu8'),
    bio: "A contemporary artist inspired by Indian mythology. I offer studio tours and personalized art workshops where you can explore your creativity.",
    languages: ['English', 'Hindi'],
    skills: ['Painting', 'Sculpture', 'Art History'],
    photos: [getImage('gallery28'), getImage('gallery29'), getImage('gallery30')],
    phone: '+918901234567',
    isAvailable: false,
  }
];

export const topFoods = [
  { id: '1', title: 'Chole Bhature', description: 'A classic North Indian breakfast.', image: getImage('food1'), imageHint: getHint('food1'), price: 3 },
  { id: '2', title: 'Masala Dosa', description: 'Crispy South Indian crepe.', image: getImage('food2'), imageHint: getHint('food2'), price: 2 },
  { id: '3', title: 'Vada Pav', description: 'The quintessential Mumbai street food.', image: getImage('food3'), imageHint: getHint('food3'), price: 1 },
  { id: '4', title: 'Jalebi', description: 'Sweet, crispy, and syrupy spirals.', image: getImage('food4'), imageHint: getHint('food4'), price: 2 },
];

export const nearbyEvents: any[] = [
  // This is now fetched by AI, but keeping as a fallback/example
  // { id: '1', title: 'Diwali Festival', description: 'City-wide celebrations.', image: getImage('event1'), imageHint: getHint('event1'), date: 'Nov 12', time: 'All Day', latitude: 28.6139, longitude: 77.2090 },
  // { id: '2', title: 'Sufi Music Night', description: 'Soulful music at Nizamuddin.', image: getImage('event2'), imageHint: getHint('event2'), date: 'Fridays', time: '8:00 PM', latitude: 28.5919, longitude: 77.2427 },
  // { id: '3', title: 'India Art Fair', description: 'Contemporary art exhibition.', image: getImage('event3'), imageHint: getHint('event3'), date: 'Feb 1-4', time: '11 AM - 7 PM', latitude: 28.5273, longitude: 77.2114 },
  // { id: '4', title: 'Qutub Festival', description: 'Classical music and dance.', image: getImage('event4'), imageHint: getHint('event4'), date: 'Dec 15-19', time: '6:30 PM', latitude: 28.5245, longitude: 77.1855 },
];

export const mustVisitAttractions = [
    { id: '1', title: 'Gwalior Fort', description: 'A hill fort in Gwalior, Madhya Pradesh.', image: getImage('attractionGwalior'), imageHint: getHint('attractionGwalior'), latitude: 26.2307, longitude: 78.1689, hours: '10:00 AM - 5:00 PM', price: '₹75 for Indians' },
    { id: '2', title: 'Humayun\'s Tomb', description: 'The tomb of the Mughal Emperor.', image: getImage('attraction2'), imageHint: getHint('attraction2'), latitude: 28.5933, longitude: 77.2507, hours: '6:00 AM - 6:00 PM', price: '₹35 for Indians' },
    { id: '3', title: 'Qutub Minar', description: 'A towering minaret and victory tower.', image: getImage('attraction3'), imageHint: getHint('attraction3'), latitude: 28.5245, longitude: 77.1855, hours: '7:00 AM - 5:00 PM', price: '₹35 for Indians' },
];

export const homestays = [
  { id: '1', name: 'The Singh Residence', price: 45, rating: 4.8, image: getImage('homestay1'), imageHint: getHint('homestay1'), latitude: 26.22, longitude: 78.18 },
  { id: '2', name: 'Patel Family Home', price: 60, rating: 4.9, image: getImage('homestay2'), imageHint: getHint('homestay2'), latitude: 26.21, longitude: 78.17 },
  { id: '3', name: 'Gupta\'s Guest Room', price: 75, rating: 4.7, image: getImage('homestay3'), imageHint: getHint('homestay3'), latitude: 26.24, longitude: 78.23 },
  { id: '4', name: 'Sharma Homestay', price: 55, rating: 4.6, image: getImage('homestay4'), imageHint: getHint('homestay4'), latitude: 26.23, longitude: 78.20 },
];

export const localFoodShops = [
    { id: '1', name: 'Bahadura Sweets', location: 'Naya Bazaar, Gwalior', rating: 4.5, reviews: 1200, image: getImage('gwalior_shop1'), imageHint: getHint('gwalior_shop1'), latitude: 26.2208, longitude: 78.1828 },
    { id: '2', name: 'SS Kachoriwala', location: 'Nai Sadak, Gwalior', rating: 4.7, reviews: 2500, image: getImage('gwalior_shop2'), imageHint: getHint('gwalior_shop2'), latitude: 26.215, longitude: 78.172 },
    { id: '3', name: 'Kwality Restaurant', location: 'Lashkar, Gwalior', rating: 4.4, reviews: 1800, image: getImage('gwalior_shop3'), imageHint: getHint('gwalior_shop3'), latitude: 26.204, longitude: 78.169 },
    { id: '4', name: 'Indian Coffee House', location: 'Phool Bagh, Gwalior', rating: 4.8, reviews: 3500, image: getImage('gwalior_shop4'), imageHint: getHint('gwalior_shop4'), latitude: 26.218, longitude: 78.18 },
    { id: '5', name: 'Panchhi Petha', location: 'Thatipur, Gwalior', rating: 4.6, reviews: 950, image: getImage('gwalior_shop5'), imageHint: getHint('gwalior_shop5'), latitude: 26.234, longitude: 78.199 },
    { id: '6', name: 'Moti Mahal Delux', location: 'City Center, Gwalior', rating: 4.3, reviews: 2200, image:getImage('gwalior_shop6'), imageHint: getHint('gwalior_shop6'), latitude: 26.218, longitude: 78.201 },
    { id: '7', name: 'Shri Restaurant', location: 'Morar, Gwalior', rating: 4.5, reviews: 1500, image: getImage('gwalior_shop7'), imageHint: getHint('gwalior_shop7'), latitude: 26.237, longitude: 78.232 },
    { id: '8', name: 'Alfanzo Restaurant', location: 'City Center, Gwalior', rating: 4.2, reviews: 1100, image: getImage('gwalior_shop8'), imageHint: getHint('gwalior_shop8'), latitude: 26.219, longitude: 78.203 },
    { id: '9', name: 'Victorian Vantage', location: 'Jayendraganj, Lashkar', rating: 4.4, reviews: 800, image: getImage('gwalior_shop9'), imageHint: getHint('gwalior_shop9'), latitude: 26.207, longitude: 78.171 },
    { id: '10', name: 'Captain\'s Cafe', location: 'Phool Bagh, Gwalior', rating: 4.9, reviews: 4100, image: getImage('gwalior_shop10'), imageHint: getHint('gwalior_shop10'), latitude: 26.217, longitude: 78.181 },
];




    

    

    