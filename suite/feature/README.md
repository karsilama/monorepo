# Feature library

This library was generated with [Nx](https://nx.dev) as a **Feature library** for Angular applications. It provides smart components and services with reactive store interactions following Angular decoupling best practices.

---

## 🧩 # Dialog Service Overview

Angular injectable service to register and open Material dialogs in a centralized way.

### Usage

#### Register dialog
```typescript
dialogService.register({
  id: 'confirm-dialog',
  component: ConfirmDialogComponent,
  configs: { width: '400px', disableClose: true }
});
```

#### Abrir diálogo
```typescript
dialog.openDialog('user-edit', {...model});
```
