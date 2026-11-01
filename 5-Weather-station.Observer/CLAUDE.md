# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing the **Observer Pattern** using a Weather Station example. The project demonstrates how to define one-to-many dependencies between objects.

## Technology Stack

- **TypeScript** with strict mode enabled
- **Vitest** for testing
- **Biome** for linting and formatting (uses tabs, double quotes)
- **Stryker** for mutation testing
- **pnpm** as package manager

## Development Commands

```bash
# Run tests in watch mode
npm run dev

# Run tests once
npx vitest run

# Run tests with coverage
npx vitest run --coverage

# Run mutation testing
npx stryker run

# Lint and format code
npx biome check .

# Auto-fix lint issues
npx biome check --write .

# Format code
npx biome format --write .
```

## Code Architecture

### Directory Structure

- `app/` - Main application source code
  - `weather-data.ts` - Observable/Subject that broadcasts measurements
  - `display/` - Observer implementations (CurrentConditions, Statistics, Forecast)
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)
- `exemple/` - Reference implementation of Observer pattern

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { WeatherData } from "@/weather-data";
```

### Design Pattern Implementation

This codebase demonstrates the **Observer Pattern**:
- WeatherData (Subject) maintains a list of observers
- Display screens (Observers) register/unregister dynamically
- When data changes, all observers are notified automatically

Key principles:
- Loose coupling between subject and observers
- Open/Closed: add new displays without modifying WeatherData
- Dependency Inversion: subject depends on observer interface

## Testing Configuration

- Tests are located in `test/**/*.{spec,test}.{js,ts}`
- Coverage reports generate in `./coverage` directory
- Mutation testing targets `app/**/*.ts`
- Vitest is configured with globals enabled (no need to import `describe`, `it`, `expect`)

## Code Style

Biome enforces:
- **Tabs** for indentation (not spaces)
- **Double quotes** for strings
- Import organization is automatic
- Recommended linting rules enabled
