/// <reference types="react-scripts" />
declare type PrimitiveValue =
  | boolean
  | number
  | string
  | bigint
  | symbol
  | null
  | undefined

declare type AnyValue = PrimitiveValue | Date | AnyValue[]

declare type AnyShape = Record<string, AnyValue | AnyShape>
