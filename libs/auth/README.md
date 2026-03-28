# Auth lib feature

This library was generated with [Nx](https://nx.dev).

## Hexagonal Architecture + NgRx Feature Store (Angular)

- Login Feature Lib
- Logout Feature Lib

```typescript
nx serve app/mercadona --open
```


#### 🧩 Overview

This approach uses **Hexagonal Architecture** combined with:

- **NgRx Feature Store**
- **Facade Pattern**
- **Ports & Adapters**
- **REST API** → **(HTTP) integration**
- **Angular Signals, Computed, and Effects**
- Use case: **Login/Logout form**

---

#### 🏗️ Hexagonal Architecture (quick view)

Separates the system into:

- **Domain (core)** → business logic
- **Ports** → Interfaces/contracts (inbound & outbound)
- **Adapters** → Implementations (e.g. HTTP)
- **Facade** → Abstraction layer that decouples the UI from NgRx
- **Feature** → Smart components / State & interaction
- **Ui** → Presentational / Dumbs components
- **Util** → Shared resources between apps or modules

---
