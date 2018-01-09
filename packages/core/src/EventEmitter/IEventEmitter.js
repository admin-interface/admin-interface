// @flow
import type { SubscriberType, HandlerType } from './types';

/**
 * @interface IEventEmitter
 */
export interface IEventEmitter {
    _subscribers: Array<SubscriberType>,

    subscribe(event: string, handler: HandlerType, priority: number, context?: any): void,

    emit(event: string, args?: any): void,

    addSubscriber(subscriber: SubscriberType): void,

    getAllSubscribers(): Array<SubscriberType>
}
