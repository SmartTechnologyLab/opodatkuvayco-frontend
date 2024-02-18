# Opodatkuvayco

Web Opodatkuvayco is a web application for calculating taxes in Ukraine.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Format with Prettier

```sh
npm run format
```

### Type check

```sh
npm run type-check
```

### Commit check in the terminal

```sh
echo 'feat!: bar' | commitlint
```

## Semantic frontend versioning

### Rules
Given a version number MAJOR.MINOR.PATCH, increment the:

- (feat!, fix!, or BREAKING CHANGE in comment) MAJOR version when you add a new problem domain solution (e.g., new site page)
- (feat) MINOR version when you add a feature an existing problem domain (e.g., add control to admin page)
- (refactor, perf, style, revert) PATCH version when you make feature tweaks, bug fixes, style or text changes (e.g., change css rules)
- (ci, docs, chore, build, test) Don't change the version
Additional labels for pre-release and build metadata could mirror Semver when appropriate  