# **App Name**: Bandhu Local

## Core Features:

- Browse Local Services: Allow travelers to browse and filter services offered by local Bandhus, including guides, photographers, artists, food vendors, and event organizers, filtered by hourly/day rate, ratings and reviews.
- Bandhu Service Profile: Enable locals (Bandhus) to create detailed profiles showcasing their services, bio, hourly charges, photos, skills, languages, availability, and bank/UPI details. Includes a KYC verification system to build trust and security.
- SOS Emergency Feature: Implement a floating SOS button accessible throughout the app, which, when pressed, sends the user's live location and details to a 24/7 support channel for immediate assistance. The design and placement should adhere to design considerations, in order to not make the button distracting during normal use of the app.
- Intelligent Itinerary Suggestions: Offer personalized itineraries to travelers by providing options that factor in local favorites and hidden gems.
- Verified Bandhu System: After successful KYC verification by the backend systems, update the Firestore user document for the Bandhu with a 'verified' boolean. Frontend reads from Firestore and displays a verified badge.
- Language Translation: Detect user locale settings, and present content (including Bandhu profile descriptions) in the user's native language

## Style Guidelines:

- Primary color: HSL hue 47 (a muted yellow), 80% saturation, 50% lightness, or #B39740 in hex, suggestive of warmth and approachability. This contrasts well on a dark background.
- Background color: A dark background of HSL hue 47 (same as primary), 20% saturation, 20% lightness, or #3D3825 in hex, for a sophisticated, accessible, high-end feel.
- Accent color: HSL hue 17 (a muted orange-red), 80% saturation, 50% lightness, or #B35240 in hex, to highlight calls to action and other interactive elements.
- Body and headline font: 'Literata' (serif) for an elegant and readable feel.
- Code font: 'Source Code Pro' (monospace) for displaying code snippets clearly, for any tutorials or guides.
- Use detailed, clear icons in a consistent style to represent the different service categories (guides, photographers, etc.)
- Maintain a clean and intuitive layout, with a clear hierarchy of information. Implement quick access tiles for main categories and a dynamic feed for personalized recommendations.
- Use subtle animations for transitions and loading states to enhance the user experience.