# Hogwarts-Finest (React + Vite)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Development

Download the dependencies
```bash
    npm i
```

Start the development server
```bash
    npm run dev
```

View the application
```bash
    http://localhost:5173
```

## Style Guide / Conventions

### Git

#### Structure

main. Holding the release

development. Holding the latest Feature

dev branches. Features & Bugs we are working on.

#### Naming

Naming a Feature Branch

`feature/[name-of-the-feature]`

Naming a Bug or Hotfix Branch

`bug/[bug-to-solve]` or `hotfix/[hot-fix-to-solve]`

## Testing (QA)
Run `npm run vitest` to run `vitests`.

Run `npm run vitest-con` to get the `vitest` test coverage.

Run `npm run jtest` to run `jests`.

## CI/CD
Pushing to `development` or `main` will run all `vtests` and `jest tests`.

To create a release push a new Tag.

If all tests are passing the `CD Pipeline` will create a build and a new release.