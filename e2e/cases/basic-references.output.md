# API

- [`defineConfig`](#defineconfig)
- [`UserConfig`](#userconfig)

## `defineConfig`

```ts
// Definition
export function defineConfig(config: UserConfig): UserConfig;
```

An identity function used to ensure type safety when defining config.

Returns [`UserConfig`](#userconfig).

| Parameter | Type                        | Optional | Default | Description |
| --------- | --------------------------- | :------: | ------- | ----------- |
| `config`  | [`UserConfig`](#userconfig) |          |         |

## `UserConfig`

```ts
// Definition
export interface UserConfig {
  name: string;
}
```

Configuration provided by the user

| Field  | Type     | Optional | Description |
| ------ | -------- | :------: | ----------- |
| `name` | `string` |          |
