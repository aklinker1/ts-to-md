# API

## `Test`

```ts
// Definition
export interface Test {
  field1: boolean;
  field2?: number;
  field3: string | undefined;
}
```

Test interface description

| Field    | Type                        | Optional | Description  |
| -------- | --------------------------- | :------: | ------------ |
| `field1` | `boolean`                   |          | Field 1 docs |
| `field2` | `number`                    |    ✅    |
| `field3` | `string` &#124; `undefined` |          | Field 3 docs |
