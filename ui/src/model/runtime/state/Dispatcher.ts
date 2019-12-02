export interface ISubscriptionHandler<T> {
  (result: T): void;
}

export interface ISubscription<T> {
  topic: string;
  handler: ISubscriptionHandler<T>;
}
export interface IDispatcher {
  subscribe<K>(topic: string, handler: ISubscriptionHandler<K>): number;
  notifySubscribers<K>(topic: string, data: K): void;
  unsubscribe(id: number): void;
}

const Dispatcher = (): IDispatcher => {
  let _subscribers: ISubscription<any>[] = [];
  const notifySubscribers = <K extends any>(topic: string, data: K) => {
    _subscribers
      .filter(item => item.topic === topic)
      .forEach(item => item.handler(data));
  };

  const subscribe = <K extends any>(
    topic: string,
    handler: ISubscriptionHandler<K>
  ) => {
    const id =
      _subscribers.push({
        handler,
        topic
      }) - 1;
    return id;
  };

  const unsubscribe = (id: number) => {
    if (id !== -1) {
      _subscribers.splice(id, 1);
    }
  };

  return {
    subscribe,
    unsubscribe,
    notifySubscribers
  };
};

export default Dispatcher;
