# Library Management System

## Project Overview

This project is a Library Management System database built using NestJS, Prisma ORM and PostgreSQL hosted on Neon.

The system manages library users, books, book genres and book reviews.

## Technologies Used

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Neon Database
- Node.js

## Database Models

The database contains five main models:

1. **User:** Stores library user information including name, email, password and role.
2. **Role:** An enumeration defining PATRON and LIBRARIAN roles.
3. **Genre:** Stores book categories and descriptions.
4. **Book:** Stores book details including title, author, ISBN and publication year.
5. **Review:** Stores ratings and comments submitted by users about books.

## Schema Decisions

The Book model references the Genre model through a foreign key called genreId rather than embedding genre information directly inside each book record.

This design follows relational database normalization principles. A genre is stored once in the Genre table and can be associated with many books.

This approach reduces data duplication and makes it easier to maintain genre information. For example, changing a genre description does not require updating every book belonging to that genre.

The relationship between Genre and Book is one-to-many. One genre can have many books while each book belongs to one genre.

The User model uses a Role enumeration to restrict user roles to PATRON or LIBRARIAN.

The Review model connects users and books through foreign keys. A unique constraint on bookId and userId prevents a user from reviewing the same book more than once.

## Database Seeding

The Prisma seed script creates:

- 4 book genres
- 16 books distributed across the four genres

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   ├── .env.example
│   └── prisma.config.ts
└── README.md
## Setup Instructions

### 1. Clone the repository

git clone https://github.com/chepchirchirdaisy09/library-management-system.git

### 2. Enter the API directory

cd library-management-system/api

### 3. Install dependencies

npm install

### 4. Configure environment variables

Create a .env file inside the api directory and add your PostgreSQL connection URL:

DATABASE_URL="your_postgresql_connection_string"

### 5. Generate Prisma Client

npx prisma generate

### 6. Apply database migrations

npx prisma migrate dev

### 7. Seed the database

npx prisma db seed

### 8. Start the application

npm run start:dev

## Database Connection

The application uses PrismaService to connect NestJS to the Neon PostgreSQL database. The service establishes the database connection when the NestJS application starts.

## Conclusion

The project demonstrates relational database design, foreign key relationships, database migrations, sample data seeding and integration of Prisma ORM with a NestJS application.
