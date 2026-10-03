class BaseCache {
    cache = new Map();
    initialized = false;
    /**
     * cache init
     */
    isInitialized() {
        return this.initialized;
    }
    /**
     * Set all data into cache
     */
    setAll(data) {
        this.cache.clear();
        data.forEach((item) => {
            this.cache.set(item.id, item);
        });
        this.initialized = true;
    }
    /**
     * Set single data
     */
    set(data) {
        this.cache.set(data.id, data);
    }
    /**
     * Get data by ID
     */
    get(id) {
        return this.cache.get(id);
    }
    /**
     * Get all data
     */
    getAll() {
        return Array.from(this.cache.values());
    }
    /**
     * Check data exists
     */
    has(id) {
        return this.cache.has(id);
    }
    /**
     * Delete data
     */
    delete(id) {
        return this.cache.delete(id);
    }
    /**
     * Clear all cache
     */
    clear() {
        this.cache.clear();
    }
    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
}
export default BaseCache;
//# sourceMappingURL=base.cache.js.map