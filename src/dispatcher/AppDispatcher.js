import Flux from "flux";

/**
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 *
 */

var {Dispatcher} = Flux;
var dispatcherInstance = new Dispatcher();

export default dispatcherInstance;