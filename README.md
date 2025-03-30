# Huffaz Portal

A Next.js application for managing Huffaz (Qur'an memorizers) with user authentication, admin dashboard, and job posting features.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Prerequisites

- [Node.js](https://nodejs.org/) v22.x
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS, HeadlessUI

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd huffaz-portal
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

- `DATABASE_URL`: Path to your SQLite database
- `JWT_SECRET`: Secret key for JWT token generation and validation
- `NEXT_PUBLIC_APP_URL`: Base URL for your application

For production, make sure to use a strong, unique `JWT_SECRET`.

## Database Setup

The project uses Prisma ORM with SQLite. The database schema is defined in `prisma/schema.prisma`.

1. Generate Prisma client:

```bash
npx prisma generate
```

2. Create and apply migrations:

```bash
npx prisma migrate dev --name init
```

3. Seed the database with initial data (optional):

```bash
npm run prisma:seed
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the development server with Turbopack at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app router pages and components
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `src/` - Source files
- `middleware.ts` - Next.js middleware for authentication
- `.env` - Environment variables

## Development Workflow

1. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test locally with `npm run dev`.

3. Lint your code:

```bash
npm run lint
```

4. Commit your changes with descriptive commit messages.

5. Push your branch and create a pull request.

## Making Changes

### Database Schema Changes

1. Modify the `prisma/schema.prisma` file.

2. Generate a migration:

```bash
npx prisma migrate dev --name describe-your-changes
```

3. Apply the changes to your local database:

```bash
npx prisma db push
```

### Adding New Dependencies

```bash
npm install package-name
```

For dev dependencies:

```bash
npm install package-name --save-dev
```

### Updating Dependencies

```bash
npm update
```

To update a specific package:

```bash
npm update package-name
```

## Deployment

This application is configured to work with Node.js v22.x.

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

For custom deployment environments, ensure you set the proper environment variables.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and test them thoroughly.
4. Create a pull request with a clear description of your changes.

## Troubleshooting

### Common Issues

- **Prisma Client Generation Errors**: Run `npx prisma generate` to regenerate the Prisma client.
- **Next.js Build Errors**: Check for TypeScript errors and missing dependencies.
- **Database Connection Issues**: Verify your `.env` file and DATABASE_URL configuration.

### Debugging

For more detailed logs during development:

```bash
NODE_ENV=development npm run dev
``` 