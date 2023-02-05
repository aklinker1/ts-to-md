# API

## `someFunction`

```ts
// Definition
export async function someFunction(
  arg1: string,
  arg2?: number,
  arg3 = true
): Promise<string>;
```

Some function docs.

Returns `Promise` `<` `string` `>`.

| Parameter | Type      | Optional | Default | Description         |
| --------- | --------- | :------: | ------- | ------------------- |
| `arg1`    | `string`  |          |         | The first argument  |
| `arg2`    | `number`  |    ✅    |         | The second argument |
| `arg3`    | `boolean` |    ✅    | `true`  | The third argument  |
