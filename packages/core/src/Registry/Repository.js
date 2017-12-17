// @flow
import objectPath from 'object-path';

/**
 * Repository
 */
class Repository {
    _registry: objectPath = objectPath({});

    /**
     * Set value
     * @param {string} key
     * @param {*} value
     * @return {Repository}
     */
    set(key: string, value: any): Repository {
        this._registry.set(key, value);
        return this;
    }

    /**
     * Get value
     * @param {string} key
     * @return {*}
     */
    get(key?: string): any {
        return this._registry.get(key);
    }

    /**
     * Push value
     * @param {string} key
     * @param {*} value
     * @return {Repository}
     */
    push(key: string, value: any): Repository {
        this._registry.push(key, value);
        return this;
    }

    /**
     * Check has value
     * @param {string} key
     * @return {boolean}
     */
    has(key: string): boolean {
        return !!this.get(key);
    }
}

export default Repository;
