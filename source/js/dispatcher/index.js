import {Dispatcher} from 'flux';

// Nothing special required for this app; just a default Flux dispatcher.
const instance = new Dispatcher();
export default instance;

// Shortcut for grabbing just the `dispatch` method in components.
export const dispatch = instance.dispatch.bind(instance);
