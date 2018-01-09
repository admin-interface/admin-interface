// @flow
import type { SubscriberType, HandlerType } from './types';
import type { IEventEmitter } from './IEventEmitter';

/**
 * Event Emitter class
 * @implements EventEmitterInterface
 */
class EventEmitter implements IEventEmitter {
    /**
     * Collection of subscribers
     * @type {Array<SubscriberType>}
     * @private
     */
    _subscribers: SubscriberType[] = [];

    /**
     * Subscribe
     * @param  {string} event - Event key
     * @param  {HandlerType} handler - Handler of event
     * @param  {number} priority - Priority
     * @param  {any} context? - Handler context
     * @returns void
     */
    subscribe(event: string, handler: HandlerType, priority: number = 10, context?: any): void {
        const subscriber: SubscriberType = {
            event,
            handler: handler.bind(context || handler),
            priority
        };
        this.addSubscriber(subscriber);
    }

    /**
     * Emit event
     * @param  {string} event
     * @param  {any} args?
     * @returns void
     */
    emit(event: string, args?: any): void {
        this.getSubscribersByEvent(event)
            .map(handler => handler.handler(args));
    }

    /**
     * Get all subscribers by event from collection
     * @param  {string} event
     * @returns {Array<SubscriberType>}
     */
    getSubscribersByEvent(event: string): SubscriberType[] {
        return this.getAllSubscribers().filter(
            (subscriber: SubscriberType) => subscriber.event === event
        );
    }

    /**
     * Add handler to collection
     * @param  {SubscriberType} subscriber
     * @returns void
     */
    addSubscriber(subscriber: SubscriberType): void {
        this._subscribers.push(subscriber);
    }

    /**
     * Get all subscribers from collection
     * @returns {Array<SubscriberType>}
     */
    getAllSubscribers(): SubscriberType[] {
        return this._subscribers.sort(
            (a: SubscriberType, b: SubscriberType) => Number(a.priority > b.priority)
        );
    }
}

export default new EventEmitter();
