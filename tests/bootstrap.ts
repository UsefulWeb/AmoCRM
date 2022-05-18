import {EventEmitter} from "events";

Object.getPrototypeOf(EventEmitter.prototype).constructor = Object;