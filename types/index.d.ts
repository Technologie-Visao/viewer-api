export declare type NumberParseable = (number | string | boolean) & {
    readonly isNumberParseble: unique symbol;
};
export declare const isNumberParseable: (value: unknown) => value is NumberParseable;
//# sourceMappingURL=index.d.ts.map