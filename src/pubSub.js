let subscribers = {};

const subscribe = function( event, callback ) {
    if (!subscribers[event]) {
        subscribers[event] = [];
    }
    subscribers[event].push(callback);
}

const publish = function( event, data ) {
    if (!subscribers[event]) return;
    subscribers[event].forEach( functionCallback => functionCallback(data) );
}

const pubSub = {
    subscribe: subscribe,
    publish: publish
}

export { pubSub };