// @flow
import EventEmitter from '../Services/EventEmitter/EventEmitter';
import { setConfigEvent } from './Events/set-config';
import { startAfter, startBefore, startEvent } from './Events/start';

EventEmitter.subscribe('set-config', setConfigEvent);
EventEmitter.subscribe('start:after', startAfter);
EventEmitter.subscribe('start', startEvent);
EventEmitter.subscribe('start:before', startBefore);
