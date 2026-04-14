# Monorepo

✨ NX monorepo / Multi App ✨.

In the Profile App, you'll find some Angular 21 feature techniques form modeling reactive. Serve the project by running' `nx serve profile --open` and explore what was created. Now, let's get you up to speed!

## 🚀 Quick Start

### Prerequisites

- Node.js 22.22.2+
- npm 10.9.7+

### Installation

```bash
npm install
```

### Run Applications

**Profile App** - Main application
```bash
nx serve profile --open
```

**API Server** - NestJS backend
```bash
nx serve api
```

### Build for Production

```bash
nx build profile
nx build api
```

### Run Tests

```bash
nx test          # Run all tests
nx test users    # Run specific library tests
```

### Code Generation

Generate new features using Nx schematics:

```bash
nx generate @schematics/angular:component my-component --project=profile
```

## 📚 Swagger API Documentation

The API includes interactive **OpenAPI/Swagger** documentation powered by **@nestjs/swagger**.

### Access Swagger UI

Once the API is running:

```bash
nx serve api
```

Open your browser and navigate to: `http://localhost:3000/docs`

### Features

- **Interactive API Explorer** - Try endpoints directly from the browser
- **Request/Response Models** - See request and response schemas
- **Authentication** - Bearer token support for protected endpoints
- **Automatic Documentation** - Generated from NestJS decorators

### Swagger Configuration

Swagger is configured in [apps/api/src/app/swagger.config.ts](apps/api/src/app/swagger.config.ts):

```typescript
const config = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('Users management API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

SwaggerModule.setup('docs', app, document);
```

### Adding API Documentation to Endpoints

Use NestJS Swagger decorators:

```typescript
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiOperation({ summary: 'Get all users' })
@ApiResponse({ status: 200, description: 'List of users' })
@Get()
findAll() {
  // Implementation
}
```

## ⭐ Apps libraries

Contains application entry points used to explore and validate new features in Angular (e.g., Signals, Signal-based Forms, Resources, RxResource, and others). These apps act as sandboxes and integration layers for experimentation.

## ⭐ Lab libraries
Lab is an experimental module libraries aims to exploring the newest front end tools, best practices and clean code.
-> Reusable UI Lab (e.g., Buttons, Dialog)

- Custom UI components
- Angular Material wrappers with standardized configuration

## ⭐ Other libraries 
-> ex: Users

- Exploring signals, store signals and signal form on a User all/details/edition pages
- Api rest integrations by using HTTP client and observables
- Auth integration

-> ex Auth

- A Singleton service  with **getAuthToken** 
- Fake **loginUser** for managing access token
- Token validation **validateToken** and **userCanEdit** form **Guards**

## ⭐ Library types

- **domain**: Core business logic and domain models
- **infrastructure**: HTTP interceptors, guards, services, and API clients 
- **features**: Feature-specific functionality and orchestration
- **state**: Centralized state management with NgRx (actions, reducers, effects, selectors)
- **ui**: Reusable presentational components (dumb components)
- **utils**: Shared helper functions, utilities, and custom pipes
- **shared**: Cross-cutting libraries and shared resources

```bash
┌─────────────────────────────────────────────────────────────────┐
│                      MONOREPO (NX)                              │
│                    Angular 21 + Signals                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴──────────────┐
                │                            │
         ┌──────▼──────┐          ┌─────────▼──────┐
         │    APPS     │          │      LIBS      │
         └─────────────┘          └────────────────┘
                │                         │
                │                         ├─── AUTH
                │                         │     └── domain/
    ┌───────────▼────────────┐           │
    │                        │           ├─── USERS
    │   profile              │           │     ├── +state/       (NgRx)
    │   ├── src/             │           │     ├── feature/      (Orquestación - Smart Components)
    │   ├── angular.json     │           │     ├── infrastructure/ (interfaces, types, contratos)
    │   └── env config       │           │     └── domain/       (lógica negocio)
    │                        │           │
    └────────────────────────┘           ├─── LAB (Shared Library - Material wrappers)
                 ▲                        │     ├── ui/           (Dumbs component)
                 │                        │     ├── buttons/      (UI)
                 │                        │     ├── dialog/       (UI)
                 │                        │     ├── list-page/    (Feature)
                 │                        │     └── schematics/   (Angular schematics)
                 │                        │
                 │                        └─── n
                 │                              
                 │
    ┌────────────┘
    │
    │ DEPENDENCIES (consume)
    │
    └─→ Signals, Signal-based Forms
    └─→ RxResource, Resources
    └─→ Angular Material
    └─→ Guards & Interceptors
```


```typescript

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI       : 21.2.7
Angular           : 21.2.8
Node.js           : 22.22.2
Package Manager   : npm 10.9.7
Operating System  : darwin arm64

┌───────────────────────────────────┬───────────────────┬───────────────────┐
│ Package                           │ Installed Version │ Requested Version │
├───────────────────────────────────┼───────────────────┼───────────────────┤
│ @angular-devkit/core              │ 21.2.7            │ ~21.2.0           │
│ @angular-devkit/schematics        │ 21.2.7            │ ~21.2.0           │
│ @angular/animations               │ 21.2.8            │ ^21.2.5           │
│ @angular/build                    │ 21.2.7            │ ~21.2.0           │
│ @angular/cdk                      │ 21.2.6            │ ^21.2.3           │
│ @angular/cli                      │ 21.2.7            │ ~21.2.0           │
│ @angular/common                   │ 21.2.8            │ ~21.2.0           │
│ @angular/compiler                 │ 21.2.8            │ ~21.2.0           │
│ @angular/compiler-cli             │ 21.2.8            │ ~21.2.0           │
│ @angular/core                     │ 21.2.8            │ ~21.2.0           │
│ @angular/forms                    │ 21.2.8            │ ~21.2.0           │
│ @angular/language-service         │ 21.2.8            │ ~21.2.0           │
│ @angular/material                 │ 21.2.6            │ ^21.2.3           │
│ @angular/platform-browser         │ 21.2.8            │ ~21.2.0           │
│ @angular/platform-browser-dynamic │ 21.2.8            │ ~21.2.0           │
│ @angular/router                   │ 21.2.8            │ ~21.2.0           │
│ @schematics/angular               │ 21.2.7            │ ~21.2.0           │
│ ng-packagr                        │ 21.2.2            │ ~21.2.0           │
│ rxjs                              │ 7.8.2             │ ~7.8.0            │
│ typescript                        │ 5.9.3             │ ~5.9.2            │
└───────────────────────────────────┴───────────────────┴───────────────────┘
```

## 📦 MongoDB Setup - Users

Added **Mongoose** for MongoDB integration:

```bash
npm install @nestjs/mongoose mongoose
```

### Schema

User schema is located at:

- `libs/users/infrastructure/src/lib/users.schema.ts`

Defines the `users` collection based on `UserDomainModel`.

### Configuration

MongoDB connection is configured in `apps/api/src/app/app.module.ts`:

```typescript
MongooseModule.forRoot('mongodb+srv://...')
```

### Usage

Import in modules:

```typescript
import { User, UserSchema } from '@users/infrastructure';

MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
```

### Import from File

Import users data from JSON file using mongoimport:

```bash
mongoimport --uri "mongodb+srv://<user>:<password>@cluster0.vbsabhz.mongodb.net/profile" \
  --collection users \
  --file scripts/users.json \
  --jsonArray
```

**Parameters:**

- `--uri`: MongoDB connection string
- `--collection`: Target collection name
- `--file`: Path to JSON file
- `--jsonArray`: Parse file as JSON array
