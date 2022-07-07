export const delay =
    (ms: number) => new Promise(
            resolve => setTimeout(resolve, ms)
        );

export function applyMixins(derivedCtor: any, constructors: any[]) {
        constructors.forEach((baseCtor) => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
                        Object.defineProperty(
                            derivedCtor.prototype,
                            name,
                            Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                            Object.create(null)
                        );
                });
        });
}