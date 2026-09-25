declare class BaseCache<T extends {
    id: number;
}> {
    protected cache: Map<number, T>;
    protected initialized: boolean;
    /**
     * cache init
     */
    isInitialized(): boolean;
    /**
     * Set all data into cache
     */
    setAll(data: T[]): void;
    /**
     * Set single data
     */
    set(data: T): void;
    /**
     * Get data by ID
     */
    get(id: number): T | undefined;
    /**
     * Get all data
     */
    getAll(): T[];
    /**
     * Check data exists
     */
    has(id: number): boolean;
    /**
     * Delete data
     */
    delete(id: number): boolean;
    /**
     * Clear all cache
     */
    clear(): void;
    /**
     * Get cache size
     */
    size(): number;
}
export default BaseCache;
//# sourceMappingURL=base.cache.d.ts.map