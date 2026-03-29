## Users State Module

This module manages user-related state using NgRx pattern, providing a complete solution for user data management, CRUD operations, and state persistence.

### Module Structure

#### Core Files
| File | Description |
|------|-------------|
| **users.actions.ts** | NgRx actions for user operations (load, create, update, delete) |
| **users.reducer.ts** | Pure reducer functions handling state transformations |
| **users.effects.ts** | Side effects for API calls and navigation using RxJS |
| **users.selectors.ts** | Memoized selectors for efficient state queries |
| **users.facade.ts** | Public API facade abstracting NgRx complexity |

#### Testing Files
| File | Description |
|------|-------------|
| **users.actions.spec.ts** | Unit tests for action creators |
| **users.reducer.spec.ts** | Reducer state transition tests |
| **users.effects.spec.ts** | Effect tests with HTTP mocking |
| **users.selectors.spec.ts** | Selector memoization and projection tests |
| **users.facade.spec.ts** | Facade dispatch and selector tests |

#### Configuration
| File | Description |
|------|-------------|
| **index.ts** | Public API barrel export |
| **jest.config.ts** | Jest test configuration |
| **project.json** | NX project configuration |
| **eslint.config.mjs** | ESLint rules configuration |
| **README.md** | Module documentation |

### Key Features

- ✅ **Complete CRUD operations** for user management
- ✅ **HTTP integration** with error handling
- ✅ **Router navigation** effects
- ✅ **Memoized selectors** for performance
- ✅ **Full test coverage** with Jest + Jasmine Marbles
- ✅ **Facade pattern** for clean component integration

### Dependencies

- `@ngrx/store` ^21.0.0
- `@ngrx/effects` ^21.0.0
- `@ngrx/entity` ^21.0.0
- `@angular/common` ^21.0.0
- `rxjs` ~7.8.0

### Usage Example

```typescript
// In component
import { UsersFacade } from '@users/state';

@Component({...})
export class UserListComponent {
  private usersFacade = inject(UsersFacade);
  
  users = this.usersFacade.all;
  
  ngOnInit() {
    this.usersFacade.navigateUserAll();
  }
  
  editUser(id: number) {
    this.usersFacade.navigateUserEdit(id);
  }
}
