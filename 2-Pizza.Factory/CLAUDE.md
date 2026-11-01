# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing the **Factory Pattern** using a Pizza Store example. The project demonstrates how to encapsulate object creation and delegate instantiation to subclasses.

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
  - `pizza.store.ts` - Pizza store with ordering logic
  - `pizze/` - Pizza classes (Margherita, Pepperoni, Veggie)
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)
- `exemple/` - Reference implementation of Factory pattern

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { PizzaStore } from "@/pizza.store";
```

### Design Pattern Implementation

This codebase demonstrates the **Factory Pattern**:
- Part 1: Simple Factory - Encapsulate pizza creation in a separate class
- Part 2: Factory Method - Let subclasses decide which pizza to instantiate

Key principles:
- Separate object creation from object usage
- Program to interfaces, not implementations
- Open/Closed principle: add new pizzas without modifying existing code

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
