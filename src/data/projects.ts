import type { FeaturedProject, Project } from './types';

const gh = 'https://github.com/JerrickJohnson';
const shots = `${import.meta.env.BASE_URL}projects/`;

export const featured: FeaturedProject = {
  slug: 'premier',
  name: 'Premier Neighborhood Services',
  tagline: 'An HOA community platform: marketplace, messaging, events, services, and dues in one application.',
  whatItIs:
    "A full-stack community application for homeowners' associations. It gives residents one place to find information, trade with neighbors, and handle HOA business.",
  problem:
    'Many HOAs have no web application, or rely on an outdated one. The goal was a demo-ready product that any HOA could adopt as a modern one-stop shop for its residents.',
  features: [
    'Secure sign-up and login with token-based authentication',
    'Neighbor marketplace for offering unwanted items to other residents',
    'Messaging between neighbors about marketplace items',
    'HOA-recommended services',
    'Community event information',
    'Payment page for HOA dues',
  ],
  myRole: [
    'Owned the repository and merged teammates’ pull requests into main',
    'Built the seller side of the marketplace: the add-item form and page, with new listings linked to the signed-in seller',
    'Built the seller’s item list with delete',
    'Added “make offer” to the item detail page and linked listings to messaging',
    'Styled the marketplace and item detail pages',
  ],
  architecture: [
    { label: 'Client', items: ['React', 'Apollo Client', 'React Router', 'Bootstrap'] },
    { label: 'API', items: ['Apollo Server · GraphQL', 'Express', 'JWT auth middleware'] },
    { label: 'Data', items: ['MongoDB', 'Mongoose models'] },
    { label: 'Services', items: ['Stripe Checkout', 'Socket.io', 'Multer uploads'] },
  ],
  builtWith: ['React', 'Apollo Client', 'GraphQL', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Stripe', 'Socket.io'],
  demonstrates: [
    'Full-stack architecture with a GraphQL API between React and Express',
    'Data modeling across users, products, orders, events, services, and messages',
    'Authentication and user-owned data, with listings tied to their seller',
    'Team development on a shared repository with branches and pull requests',
  ],
  // Optimized copies of the screenshots in the project README
  screenshots: [
    {
      src: `${shots}premier-marketplace.webp`,
      alt: 'Marketplace page: posted items in a card grid with prices and Make Offer buttons, category filters above, and a Post Item button',
      caption: 'Marketplace, the part of the app I built',
      width: 1400,
      height: 650,
    },
    {
      src: `${shots}premier-home.webp`,
      alt: 'Home page with navigation for Messages, Marketplace, Events, Services, and Payments above a community photo carousel',
      caption: 'Home and navigation',
      width: 1400,
      height: 699,
    },
    {
      src: `${shots}premier-mobile.webp`,
      alt: 'Narrow-screen layout with collapsed navigation and an amenities carousel',
      caption: 'Responsive layout',
      width: 800,
      height: 682,
    },
  ],
  repo: `${gh}/Premier_Neighborhood_Services`,
  team: 'Team of 5',
  size: 'featured',
};

export const projects: Project[] = [
  {
    slug: 'datebook',
    name: 'Datebook',
    tagline: 'A secure, offline Windows date calculator I built with AI for my own testing work.',
    origin:
      'Testing insurance print and transaction processing means working out exact dates for specific processing cycles, so the correct transactions are generated for insureds in test and development. I built Datebook with Claude to handle those calculations, and I use it in my own testing and development work.',
    whatItIs:
      'A Windows desktop app for adding or subtracting years, months, weeks, and days from a date, or measuring the gap between two dates, with business days, U.S. holidays (including observed dates), custom days off, and saved presets.',
    builtWith: ['Electron', 'JavaScript', 'HTML', 'CSS', 'flatpickr', 'electron-builder', 'Claude'],
    demonstrates: [
      'Turning a real problem from my own work into a working tool',
      'Date logic with real edge cases: month-end rollover, leap years, business days, observed holidays, and strict date validation',
      'Electron security hardening: context isolation, sandboxing, a Content Security Policy that blocks all network access, and blocked navigation',
      'Packaging a desktop app as a Windows installer with electron-builder',
    ],
    howBuilt: [
      'Defined the features from what my testing work needed',
      'Built it with Claude as an AI pair programmer',
      'Reviewed the code, including the Electron security settings',
      'Tested it against real date cycles from my work and had issues fixed',
      'Built the Windows installer with electron-builder',
    ],
    aiAssisted: true,
    screenshot: {
      src: `${shots}datebook.webp`,
      alt: 'Datebook adding 30 business days to September 24, 2026, with the result November 5, 2026 and weekends skipped',
      caption: '30 business days from a start date, weekends skipped',
      width: 1400,
      height: 1005,
    },
    repo: `${gh}/Date_Calculator`,
    size: 'spotlight',
  },
  {
    slug: 'homeward',
    name: 'Homeward Bound',
    tagline: 'A lost-and-found pet board with image uploads.',
    whatItIs:
      'A web application that helps lost pets get home. Owners post lost pets with descriptions, locations, and rewards; finders post found pets and contact owners; shelters post adoptable and adopted pets.',
    builtWith: ['Node.js', 'Express', 'Handlebars', 'Sequelize', 'MySQL', 'bcrypt', 'express-session', 'Multer', 'Sharp'],
    demonstrates: [
      'Server-rendered MVC architecture with Express and Handlebars',
      'Relational data modeling with Sequelize and MySQL',
      'Session-based authentication with hashed passwords',
      'An image pipeline: Multer handles uploads and Sharp converts them to PNG',
    ],
    repo: `${gh}/homeward-bound`,
    team: 'Team of 4',
    size: 'wide',
  },
  {
    slug: 'movies',
    name: 'Movie Watchlist',
    tagline: 'Movie discovery and a personal, reorderable watchlist.',
    whatItIs:
      'A client-side application for searching and discovering movies and building a watchlist you can reorder and keep between visits.',
    builtWith: ['JavaScript', 'jQuery', 'TMDB API', 'Wikipedia API', 'SortableJS', 'Materialize', 'localStorage'],
    demonstrates: [
      'Coordinating two third-party APIs: TMDB for movie data, Wikipedia for reference links',
      'Multiple search paths: by title, by person, and by genre discovery',
      'Client-side persistence of a user-ordered list',
    ],
    repo: `${gh}/movie-watchlist`,
    live: 'https://shannonkprice00.github.io/movie-watchlist/',
    team: 'Team of 4',
    size: 'pair',
  },
  {
    slug: 'weather',
    name: 'Weather Dashboard',
    tagline: 'Current conditions and a five-day forecast for any city.',
    whatItIs:
      'Search a city to see current weather and a five-day forecast. Recent searches are saved so any city is one click away.',
    builtWith: ['JavaScript', 'OpenWeather API', 'Day.js', 'localStorage', 'HTML', 'CSS'],
    demonstrates: [
      'Consuming a REST API for both current conditions and forecast data',
      'Transforming raw API responses into a readable interface',
      'Client-side persistence of search history',
    ],
    repo: `${gh}/5-Day-Weather-Forecast`,
    live: 'https://jerrickjohnson.github.io/5-Day-Weather-Forecast/',
    size: 'pair',
  },
  {
    slug: 'techblog',
    name: 'Tech Blog',
    tagline: 'A CMS-style blog for developers.',
    whatItIs: 'A CMS-style blog where developers publish posts and comment on each other’s posts.',
    builtWith: ['Express', 'Handlebars', 'Sequelize', 'MySQL', 'bcrypt', 'express-session'],
    demonstrates: ['CRUD with authenticated ownership of posts', 'MVC structure with a user dashboard'],
    repo: `${gh}/The_Tech_Blog`,
    size: 'compact',
  },
  {
    slug: 'social',
    name: 'NoSQL Social Network API',
    tagline: 'A REST API for a social network.',
    whatItIs: 'An API where users share thoughts, react to friends’ thoughts, and manage a friend list.',
    builtWith: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    demonstrates: ['REST API design', 'Document modeling with embedded subdocuments and references'],
    repo: `${gh}/NoSQL-Social-Network-API`,
    size: 'compact',
  },
];
