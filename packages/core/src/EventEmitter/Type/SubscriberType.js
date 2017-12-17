// @flow
import type { HandlerType } from './HandlerType';

/**
 * @typedef SubscriberType
 */
export type SubscriberType = {
    event: string,
    handler: HandlerType,
    priority: number
}
