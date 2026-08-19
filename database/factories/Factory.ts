export abstract class Factory<T> {
    abstract definition(): T;

    make(): T {
        return this.definition();
    }

    makeMany(count: number): T[] {
        return Array.from(
            { length: count },
            () => this.make()
        );
    }
}