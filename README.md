# TypeScript + Vitest Project

A TypeScript project configured with Vitest for testing.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Development Mode

Watch mode for TypeScript compilation:

```bash
npm run dev
```

## Project Structure

```
.
├── src/              # Source files
│   └── index.ts      # Example source file
├── tests/            # Test files
│   └── index.test.ts # Example test file
├── dist/             # Compiled output (generated)
├── coverage/         # Coverage reports (generated)
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vitest.config.ts  # Vitest configuration
└── README.md         # This file
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run dev` - Watch mode for TypeScript compilation
