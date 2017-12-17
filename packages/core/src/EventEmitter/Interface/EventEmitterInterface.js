// @flow
import type { SubscriberType } from '../Type/SubscriberType';
import type { HandlerType } from '../Type/HandlerType';

/**
 * @interface EventEmitterInterface
 */
export interface EventEmitterInterface {
    _subscribers: Array<SubscriberType>,

    static subscribe(event: string, handler: HandlerType, priority: number, context?: any): void,

    static emit(event: string, args?: any): void,

    addSubscriber(subscriber: SubscriberType): void,

    getAllSubscribers(): Array<SubscriberType>
}
