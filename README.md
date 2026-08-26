# FurEver Care

**"They Deserve Forever Love"**

A responsive, single-page web application for pet care — connecting pet owners, veterinarians, and animal shelters in Pakistan.

![FurEver Care](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green)

## Overview

FurEver Care is a comprehensive pet care platform with three distinct user flows:

- **Pet Owners:** Access feeding guides, grooming tutorials, health tips, product showcases, and emergency contacts
- **Veterinarians:** Manage profiles, view time slots, and access case studies
- **Shelter Volunteers:** Browse adoptable pets, view success stories, and check upcoming events

## Features

### Shared Components
- Persistent user name in header across all pages
- Animated navigation menu with role-based links
- Horizontal scrolling ticker with geolocation, date/time, and rotating updates
- Live real-time clock
- Session-based visitor counter
- Smooth page transitions and hover animations
- Fully responsive design (mobile, tablet, desktop)

### Pet Owner Module
- Pet intake form with validation
- Dashboard with profile, feeding guide, grooming videos, health/training tips
- Product showcase with search, category filter, and sort
- Emergency contacts with severity indicators
- Feedback form with toast confirmation
- Contact page with embedded Google Map
- About page with mission and team info

### Veterinarian Module
- Profile creation with specialization selection
- Dashboard with profile card and time slots
- Expandable case studies with treatment details

### Animal Shelter Module
- Adoption gallery with type filters (Dog/Cat/Rabbit)
- Success stories with photos and narratives
- Events listing for adoption drives and vaccination camps
- Shelter contact information with map

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Routing:** @tanstack/react-router (file-based)
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **State Management:** React Context (SessionProvider)
- **Data Fetching:** @tanstack/react-query
- **Notifications:** Sonner (toast notifications)
- **Build Tool:** Vite

## Project Structure

```
furever-companions-main/
├── public/
│   └── data/              # JSON data files
├── src/
│   ├── components/
│   │   ├── furever/       # Shared components
│   │   └── ui/            # Radix UI components
│   ├── lib/               # Utilities
│   ├── routes/            # Page components
│   ├── styles.css         # Global styles
│   ├── router.tsx         # Router config
│   └── start.ts           # Entry point
├── README.md
├── PROJECT_REPORT.md
└── TEST_DATA.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd furever-companions-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Data Files

All data is stored as JSON files in `public/data/`:

- `products.json` — Pet products with categories and prices
- `shelterPets.json` — Adoptable pets with details
- `vets.json` — Veterinarian directory
- `caseStudies.json` — Medical case studies
- `events.json` — Upcoming events
- `successStories.json` — Adoption success stories
- `emergencyContacts.json` — Emergency vet hotlines

See `TEST_DATA.md` for detailed data documentation.

## Design System

### Colors
- **Primary (plum):** #8B5CF6 — Headers and primary actions
- **Secondary (sage):** #86EFAC — Success states and accents
- **Accent (sky):** #7DD3FC — Information and links
- **Background (sand):** #FEF3C7 — Warm backgrounds

### Typography
- Display font: Bold, large headings
- Body font: Clean, readable text
- Consistent scale for hierarchy

### Components
- Rounded corners (xl, 2xl, 3xl) for pet-friendly aesthetic
- Card lift animations on hover
- Soft shadows and smooth transitions

## Documentation

- **PROJECT_REPORT.md** — Comprehensive project documentation
- **TEST_DATA.md** — Test data documentation and scenarios

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
