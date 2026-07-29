# generators

This library was generated with [Nx](https://nx.dev).


## Work with Generators

- Create new workspace
```bash
$ nx g @nx/plugin:plugin libs/lab/generators --importPath=@lab/generators
```

- Create generator

```bash
$  nx g @nx/plugin:generator --name=feature-route-module --path=libs/lab/generators/src/feature-route-module
```

- Use the generator
```bash
$ nx g @lab/generators:feature-route-module --name=auth --directory=libs/auth/domain/src/lib
```

## Building
```bash
Run `nx build generators` to build the library.
```
