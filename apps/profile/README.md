# App Profile

Profile es un monorepo Angular 21 con modelado reactivo

Son librerías que las utilizo para explorar y validar nuevas features de Angular (Signals, Signal-based Forms, Resources, RxResource, etc.).

Al estar en crecimiento, también encontrás @todos, integraciones fake u otros procesos experimentales.

Open project ->

```typescript
nx serve app/profile --open
```

## ⭐ Lab Libraries


### Buttons | UI lib
- LabMiniFabButton - **MatMiniFabButton** *wrapper*
- LabButton - **MatButton**  *wrapper*




### Dialog | Feature lib
- DialogService -> *Register dialogs and interact with it*

### Schematics | Schematic lib
-  generators -> *ex: feature-route-module*



## ⭐ User Lib

Use case -> User edition
- User list / details page -> *Api rest & signals integrations*
- User dialog edition -> *Lab Integration* **Dialog**



## ⭐ Auth Lib
Use case -> User authorizaion
- **CanActivate** / **CanMatch** by requesting user token validation
- **domain** Core business logic and domain models
- **infrastructure** interfaces
- **feature** Smart and reactive components
- **+state** NgRx (actions, reducers, effects, selectors)


