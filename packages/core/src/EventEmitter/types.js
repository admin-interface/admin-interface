// @flow

/**
 * @typedef HandlerType
 */
export type HandlerType = (args: any) => void;

/**
 * @typedef SubscriberType
 */
export type SubscriberType = {
    event: string,
    handler: HandlerType,
    priority: number
}
