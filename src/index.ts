export type NumberParseable = (number | string | boolean) & {
  readonly isNumberParseble: unique symbol;
};

export const isNumberParseable = (value: unknown): value is NumberParseable =>
  !Number.isNaN(Number(value));
