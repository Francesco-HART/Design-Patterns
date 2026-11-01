# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing the **Adapter Pattern** using a Payment Gateway example. The project demonstrates how to make incompatible interfaces work together.

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
  - `payment.service.ts` - Business logic depending on abstractions
  - `payment.processor.ts` - Adapter for external payment APIs
  - `payment-methode/` - External payment provider classes (Stripe, PayPal)
  - `main.ts` - Application entry point
- `test/` - Test files (*.spec.ts or *.test.ts)
- `exemple/` - Reference implementation of Adapter pattern

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { PaymentService } from "@/payment.service";
```

### Design Pattern Implementation

This codebase demonstrates the **Adapter Pattern**:
- Wrap external payment APIs (Stripe, PayPal) with adapters
- Business logic depends on a common interface
- Add new payment providers without modifying service code

Key principles:
- Convert incompatible interfaces to compatible ones
- Decouple business logic from external dependencies
- Open/Closed: add new adapters without changing existing code

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
