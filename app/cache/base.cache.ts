class BaseCache<T extends { id: number }> {

    protected cache = new Map<number, T>();
    protected initialized = false;


    /**
     * cache init 
     */
    isInitialized():boolean {
        return this.initialized;
    }
    /**
     * Set all data into cache
     */
    setAll(data: T[]): void {
        this.cache.clear();

        data.forEach((item) => {
            this.cache.set(item.id, item);
        });

        this.initialized = true;
    }

    /**
     * Set single data
     */
    set(data: T): void {
        this.cache.set(data.id, data);
    }

    /**
     * Get data by ID
     */
    get(id: number): T | undefined {
        return this.cache.get(id);
    }

    /**
     * Get all data
     */
    getAll(): T[] {
        return Array.from(this.cache.values());
    }

    /**
     * Check data exists
     */
    has(id: number): boolean {
        return this.cache.has(id);
    }

    /**
     * Delete data
     */
    delete(id: number): boolean {
        return this.cache.delete(id);
    }

    /**
     * Clear all cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get cache size
     */
    size(): number {
        return this.cache.size;
    }
}

export default BaseCache;