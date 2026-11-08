
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting library database seeding...');

  // Create the four genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: {
      name: 'Fiction',
      description: 'Novels and imaginative stories',
    },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: {
      name: 'Science',
      description: 'Books about scientific discoveries and knowledge',
    },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: {
      name: 'Technology',
      description: 'Books about computing and technological innovation',
    },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: {
      name: 'History',
      description: 'Books about historical events and people',
    },
  });

  // Create 16 books distributed across the four genres
  const books = [
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      publishedYear: 1958,
      genreId: fiction.id,
    },
    {
      title: 'The River Between',
      author: 'Ngugi wa Thiong’o',
      isbn: '9780435905484',
      publishedYear: 1965,
      genreId: fiction.id,
    },
    {
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9781400095209',
      publishedYear: 2006,
      genreId: fiction.id,
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      isbn: '9780061122415',
      publishedYear: 1988,
      genreId: fiction.id,
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      publishedYear: 1988,
      genreId: science.id,
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      publishedYear: 1976,
      genreId: science.id,
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      publishedYear: 1980,
      genreId: science.id,
    },
    {
      title: 'The Gene',
      author: 'Siddhartha Mukherjee',
      isbn: '9781476733500',
      publishedYear: 2016,
      genreId: science.id,
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      publishedYear: 2008,
      genreId: technology.id,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas and Andrew Hunt',
      isbn: '9780135957059',
      publishedYear: 2019,
      genreId: technology.id,
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen and others',
      isbn: '9780262046305',
      publishedYear: 2022,
      genreId: technology.id,
    },
    {
      title: 'The Innovators',
      author: 'Walter Isaacson',
      isbn: '9781476708696',
      publishedYear: 2014,
      genreId: technology.id,
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      publishedYear: 2015,
      genreId: history.id,
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      publishedYear: 1994,
      genreId: history.id,
    },
    {
      title: 'A People’s History of the United States',
      author: 'Howard Zinn',
      isbn: '9780062397348',
      publishedYear: 1980,
      genreId: history.id,
    },
    {
      title: 'The Wretched of the Earth',
      author: 'Frantz Fanon',
      isbn: '9780802141323',
      publishedYear: 1961,
      genreId: history.id,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log('Successfully created 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
