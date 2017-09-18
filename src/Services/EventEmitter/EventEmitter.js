// @flow
import { type SubscriberType } from './Type/SubscriberType';
import { type HandlerType } from './Type/HandlerType';
import { EventEmitterInterface } from './Interface/EventEmitterInterface';

let instance = null;

/**
 * Event Emitter class
 * @implements EventEmitterInterface
 */
class EventEmitter implements EventEmitterInterface {
    /**
     * Collection of subscribers
     * @type {Array<SubscriberType>}
     * @private
     */
    _subscribers: Array<SubscriberType> = [];

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /**
     * Get instance class
     *
     * @returns EventEmitter
     */
    static getInstance(): EventEmitter {
        return new EventEmitter();
    }

    /**
     * Subscribe
     * @param  {string} event - Event key
     * @param  {HandlerType} handler - Handler of event
     * @param  {number} priority - Priority
     * @param  {any} context? - Handler context
     * @returns void
     */
    static subscribe(event: string,
                     handler: HandlerType,
                     priority: number = 10,
                     context?: any): void {
        const subscriber: SubscriberType = {
            event,
            handler: handler.bind(context || handler),
            priority
        };
        this.getInstance().addSubscriber(subscriber);
    }

    /**
     * Emit event
     * @param  {string} event
     * @param  {any} args?
     * @returns void
     */
    static emit(event: string, args?: any): void {
        this.getSubscribersByEvent(event)
            .map(handler => handler.handler(args));
    }

    /**
     * Get all subscribers by event from collection
     * @param  {string} event
     * @returns {Array<SubscriberType>}
     */
    static getSubscribersByEvent(event: string): Array<SubscriberType> {
        return this.getInstance().getAllSubscribers().filter(
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
    getAllSubscribers(): Array<SubscriberType> {
        return this._subscribers.sort(
            (a: SubscriberType, b: SubscriberType) => Number(a.priority > b.priority)
        );
    }
}

export default EventEmitter;
