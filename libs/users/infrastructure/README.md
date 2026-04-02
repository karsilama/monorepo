# users-infrastructure

This library was generated with [Nx](https://nx.dev).


## AuthUser
-  Manage User access

## AuthInterceptor

- Add the User access token to the current Request


```typescript

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
})
export class UsersFeatureModule {}
```
