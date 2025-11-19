# Vite Project Boilerplate

## Repository contents

Repository contains boilerplate project using Vite.

Project is using tools in versions listed below:

| Technology | Version |
| ---------- | ------- |
| Node.js    | ^24.x   |
| TypeScript | ^5.9    |
| Yarn       | ^1.22   |

Project's main dependencies are listed below.

| Dependency   | Version |
| -------      | ------- |
| Vite         | ^7.2    |
| React        | ^19.x   |
| Tailwind CSS | ^4.x    |
| Vitest       | ^4.x    |
| Playwright   | ^1.x    |
| Zod          | ^4.x    |
| Axios        | ^1.x    |
| Zustand      | ^5.x    |
| Storybook    | ^10.x   |

### Package descriptions

- **Vite** - Next-generation frontend build tool providing fast development experience with instant HMR and optimized production builds
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Zod** - TypeScript-first schema validation library for runtime type checking
- **Axios** - Promise-based HTTP client for making API requests
- **Vitest** - Fast unit testing framework powered by Vite
- **Playwright** - End-to-end testing framework for reliable cross-browser testing
- **Zustand** - Lightweight state management library for React applications
- **Storybook** - UI development environment and playground for building, previewing, and testing isolated components interactively

## Infrastructure

This is a frontend-only boilerplate that runs locally using Vite development server.

## Setting project up

This app uses Node.js and Yarn package manager. In order to set up project, follow these steps:

1. Install Node.js (v24.x or higher):
   - Download from [nodejs.org](https://nodejs.org/)
   - Use a version manager like [nvm](https://github.com/nvm-sh/nvm)

2. Install Yarn globally:

   ```shell
   npm install --global yarn@^1.22
   ```

3. Clone project by running:

   ```shell
   git clone <your-repository-url>
   ```

4. Navigate to the project directory:

   ```shell
   cd vite-project-boilerplate
   ```

5. Install dependencies using Yarn:

   ```shell
   yarn install
   ```

## Running the project

To start the development server:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Available scripts

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn preview          # Start production server (after build)
yarn test             # Run unit tests with Vitest
yarn test:coverage    # Run tests with coverage report
yarn e2e              # Run end-to-end tests with Playwright
yarn e2e:ui           # Run Playwright tests in UI mode
yarn lint             # Run Biome linter
yarn lint:fix         # Fix linting issues automatically
yarn storybook        # Run Storybook in development mode
yarn storybook:build  # Build Storybook for production
```

## Build

This project uses Vite and React Router for building and serving the application. The build process generates optimized static assets for production deployment.

Build the project with `yarn build` and preview the production build locally with `yarn preview`.

## Testing

This boilerplate includes both unit testing and end-to-end testing:

- **Unit Tests**: Uses Vitest with React Testing Library for component and utility testing
- **E2E Tests**: Uses Playwright for browser-based end-to-end testing

Run tests with:

```bash
yarn test              # Run unit tests
yarn test:coverage     # Run tests with coverage
yarn e2e               # Run E2E tests
yarn e2e:ui            # Run E2E tests in UI mode
```

## Linting

This boilerplate uses BiomeJS for code linting and formatting. Biome is a fast, all-in-one toolchain that replaces ESLint, Prettier, and other tools.

- **Linter**: BiomeJS provides fast linting with TypeScript support
- **Formatter**: Built-in code formatter with consistent style
- **Import Organization**: Automatic import sorting and organization

Run linting with:

```bash
yarn lint              # Check for linting issues
yarn lint:fix          # Automatically fix linting and formatting issues
```

The project is configured with custom linting rules in `biome.json`, including complexity checks, style rules, and correctness validations for TypeScript files.

## Visual testing

This boilerplate uses Storybook for visual testing and component development. Storybook provides an isolated environment to develop, test, and document UI components independently.

- **Component Development**: Build and test components in isolation
- **Visual Testing**: Preview components with different props and states
- **Documentation**: Auto-generate component documentation from stories
- **Addons**: Includes accessibility, docs, and Vitest integration addons

Run Storybook with:

```bash
yarn storybook        # Start Storybook development server (http://localhost:6006)
yarn storybook:build  # Build Storybook for production deployment
```

## Resources

- [Vite Documentation](https://vite.dev/) - Vite build tool documentation
- [React Router Documentation](https://reactrouter.com/) - React Router framework documentation
- [React Documentation](https://react.dev/reference/react) - React.js reference
- [Learn React](https://react.dev/learn) - an interactive React.js tutorial
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Tailwind CSS documentation
- [Vitest Documentation](https://vitest.dev/) - Vitest testing framework documentation
- [Playwright Documentation](https://playwright.dev/) - Playwright E2E testing documentation
- [BiomeJS Documentation](https://biomejs.dev/) - BiomeJS linter and formatter documentation
- [Storybook Documentation](https://storybook.js.org/) - Storybook component development and visual testing documentation
