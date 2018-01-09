// @flow

/**
 * @typedef RouteType
 */
export type RouteType = {
    route: string,
    controller: string,
    action: string,
    handler: () => mixed
}

/**
 * @typedef RoutingType
 */
export type RoutingType = {
    [string]: RouteType
}
