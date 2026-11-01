# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project teaching the **SOLID Principles** through practical exercises. Each sub-folder focuses on one principle.

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
  - `1-SRP/` - Single Responsibility Principle
  - `2-OCP/` - Open/Closed Principle
  - `3-LSP/` - Liskov Substitution Principle
  - `4-ISP/` - Interface Segregation Principle
  - `5-DIP/` - Dependency Inversion Principle
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { Article } from "@/1-SRP/article";
```

### SOLID Principles

1. **SRP** - Single Responsibility: A class should have only one reason to change
2. **OCP** - Open/Closed: Open for extension, closed for modification
3. **LSP** - Liskov Substitution: Subtypes must be substitutable for base types
4. **ISP** - Interface Segregation: Clients should not depend on interfaces they don't use
5. **DIP** - Dependency Inversion: Depend on abstractions, not concretions

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
