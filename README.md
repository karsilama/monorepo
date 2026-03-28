# Monorepo

✨ NX monorepo / Multi App ✨.

In the Profile App, you'll find some Angular 21 feature techniques form modeling reactive. Serve the proyect by running' `nx serve apps/profile --open` and explore what was created. Now, let's get you up to speed!

## Apps Folder

Contains application entry points used to explore and validate new features in Angular (e.g., Signals, Signal-based Forms, Resources, RxResource, and others). These apps act as sandboxes and integration layers for experimentation.

## Libs Folder

Houses reusable, feature-oriented libraries structured by domain and responsibility.

* **Suite**

  * **core**: shared foundations and cross-cutting concerns
  * **features**: domain-specific functionality
  * **ui**: reusable presentation components
  * **utils**: helper functions and utilities

* **Libs**

  * Feature Store libraries encapsulating state management and business logic for specific domains
