# FurEver Care — Test Data Document

## Overview
This document describes the test data used throughout the FurEver Care application. All data is stored as JSON files in the `public/data/` directory and loaded dynamically via the `useJsonData` hook.

## Data Files

### 1. products.json
**Purpose:** Pet product showcase for pet owners
**Fields:**
- `id`: Unique identifier
- `name`: Product name
- `category`: Food, Toys, Accessories, Health
- `image`: URL to product image
- `description`: Product description
- `price`: Price in PKR

**Sample Count:** 15 products across 4 categories

### 2. shelterPets.json
**Purpose:** Adoption gallery for animal shelter module
**Fields:**
- `id`: Unique identifier
- `name`: Pet name
- `type`: Dog, Cat, Rabbit
- `age`: Age string (e.g., "2 years")
- `breed`: Breed name
- `description`: Pet description
- `image`: URL to pet photo

**Sample Count:** 10 pets (5 dogs, 3 cats, 2 rabbits)

### 3. vets.json
**Purpose:** Veterinarian directory (future use)
**Fields:**
- `id`: Unique identifier
- `name`: Veterinarian name
- `specialization`: Medical specialization
- `contact`: Phone number
- `image`: URL to vet photo

**Sample Count:** 5 veterinarians

### 4. caseStudies.json
**Purpose:** Medical case studies for veterinarian dashboard
**Fields:**
- `id`: Unique identifier
- `petName`: Patient name
- `species`: Animal species
- `condition`: Medical condition
- `summary`: Case summary
- `treatment`: Treatment details
- `outcome`: Treatment outcome

**Sample Count:** 5 case studies

### 5. events.json
**Purpose:** Upcoming events for shelter module
**Fields:**
- `id`: Unique identifier
- `title`: Event title
- `date`: Event date
- `location`: Event location
- `description`: Event description

**Sample Count:** 6 events (adoption drives, vaccination camps)

### 6. successStories.json
**Purpose:** Adoption success stories for shelter module
**Fields:**
- `id`: Unique identifier
- `petName`: Pet name
- `adopter`: Adopter name
- `year`: Adoption year
- `story`: Success story text
- `image`: URL to pet photo

**Sample Count:** 4 success stories

### 7. emergencyContacts.json
**Purpose:** Emergency contacts for pet owners
**Fields:**
- `id`: Unique identifier
- `name`: Contact name
- `type`: Contact type (Vet Line, Poison Control, Rescue)
- `phone`: Phone number
- `hours`: Operating hours
- `note`: Additional notes
- `severity`: critical, high, or medium

**Sample Count:** 8 emergency contacts

## Testing Scenarios

### Pet Owner Flow
1. **Landing Page:** Enter name, select "Pet Owner" role
2. **Intake Form:** Fill pet details (name, species, breed, age, gender, vaccination)
3. **Dashboard:** View pet profile, feeding guide, grooming videos, health/training tips
4. **Products:** Browse products, search by name, filter by category, sort by name/price
5. **Emergency:** View emergency contacts with severity indicators
6. **Feedback:** Submit feedback form with validation
7. **Contact:** View contact info and embedded map
8. **About:** View mission, team, and values

### Veterinarian Flow
1. **Landing Page:** Enter name, select "Veterinarian" role
2. **Intake Form:** Fill vet details (name, specialization, contact, optional photo)
3. **Dashboard:** View profile, weekly time slots (with booked indicators), expandable case studies

### Shelter Volunteer Flow
1. **Landing Page:** Enter name, select "Animal Shelter" role
2. **Gallery:** View adoptable pets, filter by type (All/Dog/Cat/Rabbit)
3. **Success Stories:** View adoption success stories with photos
4. **Events:** View upcoming events (adoption drives, vaccination camps)
5. **Contact:** View shelter info, visiting hours, and embedded map

## Data Validation
- All JSON files are valid JSON format
- All required fields are present in each entry
- Image URLs are valid placeholder images
- Phone numbers follow Pakistani format (+92-...)
- Dates are in readable format
- Severity levels are limited to: critical, high, medium

## Known Limitations
- Data is static and not persisted
- No backend connectivity
- Images are placeholder URLs
- Geolocation is browser-dependent (may not work in all environments)
- Visitor counter is session-based (not persistent across sessions)
