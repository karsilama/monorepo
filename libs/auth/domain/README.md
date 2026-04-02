# auth-domain

This library was generated with [Nx](https://nx.dev).

## Auth Service

- Token validation using Angular resource

```typescript
public readonly loggedUser = resource({
    loader: async () => {
      const requestBody = {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 60,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    },
  });
  ```

## Pending on AuthService
- User TOKEN validation
- User Permissions
