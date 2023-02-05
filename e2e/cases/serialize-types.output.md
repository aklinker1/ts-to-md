# API

- [`AllTypes`](#alltypes)

## `AllTypes`

```ts
// Definition
export interface AllTypes {
  void: void;
  never: never;
  undefined: undefined;
  null: null;
  any: any;
  object: {
    key: "value";
  };
  array: string[];
  readonlyArray: ReadonlyArray<string>;
  union: "one" | "two";
  intersection: "one" & "two";
  string: string;
  stringLiteral: "hello";
  number: number;
  numberLiteral: 44;
  boolean: boolean;
  booleanLiteral: false;
  anonymousTuple: [string, number];
  namedTuple: [one: string, two: number];
  customType: CustomType;
  singleTypeParam: Promise<any>;
  multipleTypeParams: Pick<
    {
      one: any;
      two: any;
    },
    "one"
  >;
}
```

| Field                | Type                                 | Optional | Description |
| -------------------- | ------------------------------------ | :------: | ----------- |
| `void`               | `void`                               |          |
| `never`              | `never`                              |          |
| `undefined`          | `undefined`                          |          |
| `null`               | `null`                               |          |
| `any`                | `any`                                |          |
| `object`             | `object`                             |          |
| `array`              | `Array<` `string` `>                 |          |
| `readonlyArray`      | `ReadonlyArray<` `string` `>         |          |
| `union`              | `"one"` &#124; `"two"`               |          |
| `intersection`       | `never`                              |          |
| `string`             | `string`                             |          |
| `stringLiteral`      | `"hello"`                            |          |
| `number`             | `number`                             |          |
| `numberLiteral`      | `44`                                 |          |
| `boolean`            | `boolean`                            |          |
| `booleanLiteral`     | `false`                              |          |
| `anonymousTuple`     | `[` `string` `, ` `number` `]`       |          |
| `namedTuple`         | `[` `string` `, ` `number` `]`       |          |
| `customType`         | `CustomType`                         |          |
| `singleTypeParam`    | `Promise` `<` `any` `>`              |          |
| `multipleTypeParams` | `Pick` `<` `object` `, ` `"one"` `>` |          |
