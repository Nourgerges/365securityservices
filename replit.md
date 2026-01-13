# 365 Security Services Website

## Overview

This is a modern security services website built for 365 Security Services, a Lebanon-based security company. The application is a full-stack web solution featuring a React frontend with a Node.js/Express backend, designed to showcase the company's security services and facilitate client engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth interactions and transitions
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon Database provider
- **Session Management**: Memory-based storage with planned database integration

### Design System
- **Theme**: Dark mode with professional bronze/copper accent color (#a87c64)
- **Typography**: Custom font stack with Orbitron, Rajdhani, and Inter
- **Layout**: Responsive design optimized for mobile and desktop
- **Brand Colors**: Black backgrounds with bronze accents for premium feel

## Key Components

### Pages Structure
- **Home**: Hero section with video background, services overview, about section
- **Service Pages**: Dedicated pages for Manned Services, Security Consultancy, Cash Services, and Security Training
- **About**: Team member profiles with interactive elements
- **Contact**: Contact form with integrated Google Maps

### Core Components
- **Navbar**: Responsive navigation with mobile menu and service dropdowns
- **Hero**: Video background with company branding and call-to-action
- **ServiceCard**: Reusable component for service presentation
- **VideoBackground**: Optimized video playback with fallback handling
- **Footer**: Company information and social media links

### Interactive Features
- **Team Section**: Interactive team member profiles with modal details
- **Client Carousel**: Animated client logo showcase
- **Video Showcases**: Multiple video sections with lazy loading
- **Contact Forms**: Form handling with validation and submission

## Data Flow

### Frontend Data Management
1. **Static Content**: Service descriptions, team information, and company details stored in component files
2. **Asset Management**: Images and videos served from public directory and attached assets
3. **Form Handling**: Contact forms with client-side validation before submission
4. **Navigation**: Wouter handles client-side routing with programmatic navigation

### Backend API Structure
1. **Express Server**: Handles static file serving and API routes
2. **Storage Interface**: Abstracted storage layer supporting both memory and database storage
3. **Route Registration**: Centralized route management with API prefix structure
4. **Development Mode**: Vite integration for hot module replacement

## External Dependencies

### Database Integration
- **Drizzle ORM**: Type-safe database operations with schema management
- **Neon Database**: PostgreSQL hosting with serverless architecture
- **Connection Pooling**: Built-in connection management through Neon serverless driver

### Media and Assets
- **Video Assets**: Local video files for background and showcase sections
- **Cloudflare Pages Limit**: Keep video assets under 25 MiB; the oversized `background.mp4` was removed to meet this limit.
- **Image Optimization**: Imported assets with build-time optimization
- **Font Loading**: Google Fonts integration with local font definitions

### Third-Party Services
- **Google Maps**: Embedded maps for business location display
- **Social Media**: LinkedIn and Instagram integration for company profiles
- **CDN Assets**: Font Awesome icons and external stylesheets

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting (implied by structure)
- **Vite Plugins**: Custom theme plugin and development enhancements

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild compiles TypeScript server to `dist/index.js`
3. **Database Migrations**: Drizzle generates and applies schema changes
4. **Asset Optimization**: Static assets processed and optimized during build

### Environment Configuration
- **Development**: Hot reloading with Vite dev server integration
- **Production**: Compiled assets served by Express with static file handling
- **Database**: Environment-based DATABASE_URL configuration
- **Deployment**: Single deployment artifact with both frontend and backend

### Performance Considerations
- **Code Splitting**: Vite handles automatic code splitting for optimal loading
- **Asset Optimization**: Images and videos optimized for web delivery
- **Caching Strategy**: Static assets served with appropriate cache headers
- **Database Queries**: Drizzle ORM provides optimized query generation

The application follows modern web development practices with a focus on performance, type safety, and maintainable code structure. The architecture supports both development efficiency and production scalability.
