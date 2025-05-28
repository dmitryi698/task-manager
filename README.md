# Task manager project

This "Task Manager" project is developed using modern web technologies for efficient task management.

## 🚀 Technologies

The project is built upon:

- **Astro**: A lightweight and fast web framework for building content-focused websites.
- **Svelte**: A UI compiler that allows writing efficient component code.
- **Prisma**: A modern ORM for Node.js and TypeScript, used for database interaction.
- **Vitest**: A fast and opinionated test framework for unit testing.

## 📁 Project Structure

```text
/
├── public/             # Static files
├── prisma/             # Database schema and migrations
├── src/
│   ├── layouts/        # Astro page layouts
│   ├── pages/          # Astro pages
│   └── components/     # Svelte components (if any)
│   └── server/         # Server utilities and lib
└── package.json        # Dependencies list and scripts
```

## ⚙️ Setup and Running

### Installing Dependencies

In the root directory of the project, run the command:

```bash
npm install
```

### Database Setup

Ensure you have the database server specified in the `.env` file (if it exists) installed and running. Then apply the migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

### Running the Project

To start the local development server, run:

```bash
npm run dev
```

The project will be available at `localhost:4321`.

### Building the Project

To build the project for production, run:

```bash
npm run build
```

The build result will be in the `./dist/` folder.

### Previewing the Build

To preview the built project locally:

```bash
npm run preview
```

## ✅ Testing

To run tests:

```bash
npm run test
```

To run tests with code coverage report:

```bash
npm run coverage
```

## 👀 Additional Information

- [Astro Documentation](https://docs.astro.build/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Documentation](https://vitest.dev/guide/)
