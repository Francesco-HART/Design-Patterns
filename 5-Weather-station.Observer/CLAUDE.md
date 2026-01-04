# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing the **Strategy Pattern** using a Duck simulation example. The project demonstrates how to use composition and interfaces to create flexible, extensible object behaviors.

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
  - `Duck.ts` - Base Duck class with core behaviors
  - `Mallard.duck.ts` - Concrete duck implementation extending Duck
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { Duck } from "@/Duck";
```

### Design Pattern Implementation

This codebase demonstrates the **Strategy Pattern**. The Duck classes are designed to allow behaviors to be composed rather than inherited, enabling runtime behavior changes and better code reuse.

Key principles:
- Duck is the base class with common behaviors (quack, swim, display)
- Concrete duck types (like Mallard) extend Duck and override specific behaviors
- The architecture should evolve to separate behaviors into strategy interfaces

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
