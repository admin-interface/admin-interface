// @flow
import { EventEmitter } from '@admin-interface/core';

export default function MiddlewareEventEmitter(eventName: string): Array<() => void> {
    return EventEmitter.getSubscribersByEvent(eventName)
        .map(middleware => middleware.handler);
}
