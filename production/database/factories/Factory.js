export class Factory {
    make() {
        return this.definition();
    }
    makeMany(count) {
        return Array.from({ length: count }, () => this.make());
    }
}
//# sourceMappingURL=Factory.js.map