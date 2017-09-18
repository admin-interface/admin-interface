// @flow
import EventEmitter from '../../Services/EventEmitter/EventEmitter';

export default function MiddlewareEventEmitter(eventName: string): Array<() => void> {
    return EventEmitter.getSubscribersByEvent(eventName)
        .map(middleware => middleware.handler);
}
