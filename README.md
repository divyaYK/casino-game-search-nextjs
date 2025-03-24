# Interactive Game Search Application

## Setup

- Copy `./env.example` file and paste it as `.env` file
- Run the following commands:

```bash
npm install       # Assuming you have node min version 20
npm run dev       # Open http://localhost:3000/ to view the application
npm run test      # Run unit tests
```

## Overview

Application Requirements:

- Real-time Search and Filtering
- Infinite Scrolling using React Query
- Error Handling & Loading states
- State Management & Storage Persistence using Zustand
- Responsive Design using SCSS
- Unit Testing

## Technical Decisions

Successful Execution:

- API Integration: Utilized React Query for server-side data fetching and caching which is helpful for Infinite Scrolling
- Cache Seeding: Added a game detail page. When navigating from the game lobby to a game detail page, the selected game's data is seeded into the React Query cache to provide an instant, seamless experience on the details page.
- State Management: Utilized Zustand to manage client-side states like filters and search prompts. State Persistence is demonstrated by using Local Storage middleware
- Utilized Sass mixins and variables for responsive design.
- Used debouncing, error & loading components to ensure better performance and visual feedback.

Failed Tasks:

- Chose to use SVG Icons instead of PNG images to have flexibility of modifying SVG attributes thus reducing the redundacy of PNG images. This took significant amount of time to resolve testing issues.
- Created simple error boundary but error UI needs to be perfected.
- Haven't resolved scrolling bug related to left navigation buttons for Game Grid
- Haven't added animations/transitions for Game Grid
- Unit tests are written with Jest and React Testing Library:
  - Wrote a few tests for SearchInput and GameGrid Component (task incomplete)
