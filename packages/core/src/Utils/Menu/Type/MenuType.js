// @flow

/**
 * @typedef ContextType
 */
export type ContextType = {
    type: string,
    key: string
}

/**
 * @typedef MenuItemType
 */
export type MenuItemType = {
    context: string | ContextType,
    title?: string,
    icon?: string,
    children?: { [string]: MenuItemType }
}

/**
 * @typedef MenuType
 */
export type MenuType = {
    title?: string,
    items: {
        [string]: MenuItemType
    }
};
