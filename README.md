# Monorepo

✨ NX monorepo / Multi App ✨.

In the Profile App, you'll find some Angular 21 feature techniques form modeling reactive. Serve the proyect by running' `nx serve apps/profile --open` and explore what was created. Now, let's get you up to speed!

## Apps Folder

Contains application entry points used to explore and validate new features in Angular (e.g., Signals, Signal-based Forms, Resources, RxResource, and others). These apps act as sandboxes and integration layers for experimentation.

## Lib Folders, 'ex. Users'

Houses reusable, feature-oriented libraries structured by domain and responsibility.

* **Suite libraries types 'ex Buttons, Dialog'**

  * **features**: domain-specific functionality
  * **ui**: reusable presentation components
  * **utils**: helper functions and utilities

* **Users**

  * Domain libraries -> interfaces, business logic
  * State libraries -> encapsulating state management, facade
  * Feature libraries -> Smart components, state integration
  * Feature libraries -> Dumb components, presentational

```typescript
    _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI       : 21.2.5
Angular           : 21.2.6
Node.js           : 20.19.0
Package Manager   : npm 10.8.2
Operating System  : darwin arm64

┌───────────────────────────────────┬───────────────────┬───────────────────┐
│ Package                           │ Installed Version │ Requested Version │
├───────────────────────────────────┼───────────────────┼───────────────────┤
│ @angular-devkit/core              │ 21.2.5            │ ~21.2.0           │
│ @angular-devkit/schematics        │ 21.2.5            │ ~21.2.0           │
│ @angular/animations               │ 21.2.6            │ ^21.2.5           │
│ @angular/build                    │ 21.2.5            │ ~21.2.0           │
│ @angular/cdk                      │ 21.2.4            │ ^21.2.3           │
│ @angular/cli                      │ 21.2.5            │ ~21.2.0           │
│ @angular/common                   │ 21.2.6            │ ~21.2.0           │
│ @angular/compiler                 │ 21.2.6            │ ~21.2.0           │
│ @angular/compiler-cli             │ 21.2.6            │ ~21.2.0           │
│ @angular/core                     │ 21.2.6            │ ~21.2.0           │
│ @angular/forms                    │ 21.2.6            │ ~21.2.0           │
│ @angular/language-service         │ 21.2.6            │ ~21.2.0           │
│ @angular/material                 │ 21.2.4            │ ^21.2.3           │
│ @angular/platform-browser         │ 21.2.6            │ ~21.2.0           │
│ @angular/platform-browser-dynamic │ 21.2.6            │ ~21.2.0           │
│ @angular/router                   │ 21.2.6            │ ~21.2.0           │
│ @schematics/angular               │ 21.2.5            │ ~21.2.0           │
│ ng-packagr                        │ 21.2.2            │ ~21.2.0           │
│ rxjs                              │ 7.8.2             │ ~7.8.0            │
│ typescript                        │ 5.9.3             │ ~5.9.2            │
└───────────────────────────────────┴───────────────────┴───────────────────┘
```
