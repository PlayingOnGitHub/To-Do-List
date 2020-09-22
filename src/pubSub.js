const subscribers = {};

const subscribe = (event, callback) => {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);
};

const publish = (event, data) => {
  if (!subscribers[event]) return;
  subscribers[event].forEach((functionCallback) => functionCallback(data));
};

const pubSub = {
  subscribe,
  publish,
};

export default pubSub;
