// @flow
import lodash from 'lodash';

import Repository from './Repository';

let instance = null;

/**
 * Registry
 */
class Registry {
    _repositories: { [string]: Repository } = {};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /**
     * Get repository
     * @param {string} key
     * @returns {Repository}
     */
    getRepository(key: string): Repository {
        if (this.hasRepository(key)) {
            return this.findRepository(key);
        }
        return this.setRepository(key);
    }

    /**
     * Check has is a repository in the registry
     * @param {string} key
     * @return {boolean}
     */
    hasRepository(key: string): boolean {
        return lodash.has(this.getRepositories(), key);
    }

    /**
     * Get all repositories
     * @return {{string: Repository}}
     */
    getRepositories(): { [string]: Repository } {
        return this._repositories;
    }

    /**
     * Find repository by key
     * @param {string} key
     * @returns {Repository|null}
     */
    findRepository(key: string): Repository {
        return lodash.get(this.getRepositories(), key);
    }

    /**
     * Set a new empty repository
     * @param {string} key
     * @return {Repository}
     */
    setRepository(key: string): Repository {
        this.getRepositories()[ key ] = new Repository();
        return this.findRepository(key);
    }
}

export default new Registry();
