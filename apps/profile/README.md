# App Profile

Profile es un monorepo Angular 21 con modelado reactivo

Son librerías que las utilizo para explorar y validar nuevas features de Angular (Signals, Signal-based Forms, Resources, RxResource, etc.).

Al estar en crecimiento, también encontrás @todos, integraciones fake u otros procesos experimentales.

Open project ->

```typescript
nx serve app/profile --open
```

The profile import User Feature. A simple Users mat-list wrapper with User details and mat-dialog wrapper for edition. Exploring signal store and signals forms.

## 🔧 Configuration

The application uses an environment-based configuration system as the place to define API endpoints and base configuration:

- **Environments**: Configuration files per environment (`development`, `production`) that define the base configuration (API URLs, etc.)
- **BASE_CONFIGURATION**: A centralized injection token that provides configuration access throughout the application, injected in `app.config` from `@configuration/infrastructure`

## ⭐ User Lib

Use case -> User edition
- User list / details page -> *Api rest & signals integrations*
- User dialog edition -> *Lab Integration* **Dialog**
- Http request -> *Auth Integration* **AuthInterceptors**



