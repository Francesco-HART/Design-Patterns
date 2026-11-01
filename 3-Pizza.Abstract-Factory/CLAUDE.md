# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing the **Abstract Factory Pattern** using a Pizza Store with regional ingredients. The project demonstrates how to create families of related objects without specifying their concrete classes.

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
  - `pizza.store.ts` - Pizza store managing ingredient factories
  - `pizze/` - Pizza classes using injected ingredients
  - `ingredients/` - Ingredient interfaces and factories
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)
- `exemple/` - Reference implementation of Abstract Factory pattern

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { PizzaIngredientFactory } from "@/ingredients/pizza-ingredient.factory";
```

### Design Pattern Implementation

This codebase demonstrates the **Abstract Factory Pattern**:
- Create families of related ingredients (dough, sauce, cheese, toppings)
- Each region (NY, Chicago) provides its own ingredient family
- Pizzas depend on abstractions, not concrete ingredient classes

Key principles:
- Ensure consistency across related products
- Dependency Inversion: depend on abstractions
- Open/Closed: add new regions without modifying pizza classes

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
