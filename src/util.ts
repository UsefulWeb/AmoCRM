export const delay =
    (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

export function applyMixins(baseClass: any, mixins: any[]) {
    return mixins.reduce((target, mixin) => {
        return mixin(target);
    }, baseClass);
}
