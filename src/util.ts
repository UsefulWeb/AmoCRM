export const delay =
    (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

export const overwriteMerge = <T>(_: T[], data: T[]) => data;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function applyMixins(baseClass: any, mixins: any[]) {
    return mixins.reduce((target, mixin) => mixin(target), baseClass);
}
