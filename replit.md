# Frutiger Aero Desktop

## Overview

A nostalgic web application that recreates a "Frutiger Aero" style desktop environment from the mid-2000s era. The project simulates a desktop operating system interface with draggable windows, a taskbar, desktop icons, and interactive applications including a profile viewer, guestbook, music player, and image gallery. Built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React useState for local UI state
- **Styling**: Tailwind CSS with custom CSS variables for the Frutiger Aero color palette
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for window animations, dragging, and transitions
- **Build Tool**: Vite

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Design**: REST endpoints defined in `shared/routes.ts` with Zod validation schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (requires DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with output to `./migrations` directory

### Project Structure
```
client/          # React frontend application
  src/
    components/  # UI components (Desktop/, Apps/, ui/)
    hooks/       # Custom React hooks
    pages/       # Route components
    lib/         # Utilities and query client
server/          # Express backend
  index.ts       # Server entry point
  routes.ts      # API route handlers
  storage.ts     # Database access layer
  db.ts          # Database connection
shared/          # Shared code between client/server
  schema.ts      # Drizzle database schema
  routes.ts      # API route definitions with Zod schemas
```

### Key Design Patterns
- **Shared Types**: Database schemas and API contracts are defined in `shared/` and imported by both client and server
- **Type-Safe APIs**: Zod schemas validate both request inputs and response outputs
- **Component Organization**: Desktop simulation components separate from shadcn/ui primitives
- **Storage Abstraction**: `IStorage` interface in `storage.ts` abstracts database operations

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema definitions and query building
- **connect-pg-simple**: Session storage (included in dependencies)

### UI/Frontend Libraries
- **Radix UI**: Headless component primitives (accordion, dialog, dropdown, tabs, etc.)
- **Framer Motion**: Animation library for window interactions
- **Lucide React**: Icon library
- **date-fns**: Date formatting for taskbar clock and timestamps
- **embla-carousel-react**: Carousel component support

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the entire codebase
- **Tailwind CSS**: Utility-first CSS framework with PostCSS

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator