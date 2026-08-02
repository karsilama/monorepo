```bash
┌──────────────────────────────────────────────────────────────────────────────┐
│                           NX MONOREPO (v22)                                 │
│                  Angular 22 • Signals • Signal Forms                        │
│                   Resources • RxResource • NestJS                           │
└──────────────────────────────────────────────────────────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
             ┌──────▼───────┐                  ┌──────────▼──────────┐
             │     APPS      │                  │       LIBRARIES     │
             └───────────────┘                  └─────────────────────┘
                    │                                     │
                    │                                     ├── AUTH
      ┌─────────────▼──────────────┐                      │   ├── domain
      │                            │                      │   ├── infrastructure
      │          profile           │                      │   └── feature
      │                            │                      │
      │  Angular 22 Playground     │                      ├── USERS
      │  • Signals                 │                      │   ├── domain
      │  • Signal Forms            │                      │   ├── infrastructure
      │  • Feature                 │                      │   ├── state (NgRx)
      │  • Resources               │                      │   └── ui
      │  • RxResource              │                      │
      └────────────────────────────┘                      ├── LAB
                    ▲                                     │   ├── ui
                    │                                     │   ├── buttons
                    │                                     │   ├── dialog
                    │                                     │   ├── list-page
                    │                                     │   └── schematics
                    │                                     │
                    └─────────────────────────────────────┤
                                                          │
                                                          ├── Shared
                                                          ├── Utils
                                                          └── Infrastructure


Dependencies
────────────

→ Angular 22
→ Signals
→ Signal Forms
→ Resources / RxResource
→ Angular Material
→ NgRx
→ NestJS
→ MongoDB / Mongoose
→ Guards & HTTP Interceptors
```
