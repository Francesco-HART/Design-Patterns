# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Design Patterns educational project implementing **Dependency Injection (DIP)** with multiple patterns (Factory, Strategy) using an Attachment Service example. The project demonstrates how to build testable, extensible architectures.

## Technology Stack

- **TypeScript** with strict mode enabled
- **Vitest** for testing
- **Biome** for linting and formatting (uses tabs, double quotes)
- **Stryker** for mutation testing
- **pnpm** as package manager
- **Express** for HTTP server

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
  - `main.ts` - Express server with attachment upload endpoint
  - `storage.service.ts` - Storage service with multiple backends
  - `IStorage.interface.ts` - Storage abstraction
  - `AwsStorage.ts`, `SftpStorage.ts`, `WebDavStorage.ts` - Implementations
  - `scanner.middleware.ts` - Virus scanning (ThreatProtect, Synergy)
  - `preview-generator.ts` - Preview generation for images, documents, videos
- `test/` - Test files (*.spec.ts or *.test.ts)

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `app/*`

Use these aliases when importing from the app directory:
```typescript
import { StorageService } from "@/storage.service";
```

### Design Pattern Implementation

This codebase demonstrates multiple patterns working together:
- **Dependency Inversion**: Business logic depends on abstractions (IStorage, IScanner)
- **Factory**: Create storage/scanner implementations based on configuration
- **Strategy**: Swap implementations at runtime (dev vs. production)

Key principles:
- No `if (env === "production")` in business logic
- All dependencies are injected, not instantiated
- Easy to test with mock implementations

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
