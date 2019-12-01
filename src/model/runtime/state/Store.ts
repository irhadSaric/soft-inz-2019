import { IDispatcher, ISubscriptionHandler } from "./Dispatcher";
import { Topics } from "../../../common/Constants";

export interface ISubscription<T> {
  (result: T): void;
}

export interface IStore {
  getState<K>(): K;
  update<K>(newState?: K): K;
  subscribe<K>(handler: ISubscription<K>): number;
  unsubscribe(id: number): void;
  clear(): void;
}

export interface TStore {
  initialState?: any;
  store: IStore;
}

const DEFAULT_TOPIC_NAME = Topics.DEFAULT;

const Store = ({
  initialState,
  dispatcher,
  defaultTopic
}: {
  initialState?: any;
  defaultTopic?: string;
  dispatcher: IDispatcher;
}): IStore => {
  const _dispatcher = dispatcher;
  const _defaultTopic = defaultTopic || DEFAULT_TOPIC_NAME;
  let _state: any = {
    [_defaultTopic]: Object.assign({}, initialState || {})
  };

  const subscribe = <K extends any>(
    handler: ISubscriptionHandler<K>,
    topic?: string
  ) => {
    const id = _dispatcher.subscribe(topic || _defaultTopic, handler);
    update();
    return id;
  };

  const unsubscribe = _dispatcher.unsubscribe;

  const update = <K extends any>(newState?: K, topic?: string) => {
    const _topic = topic || _defaultTopic;
    _state = Object.assign({}, _state, {
      [_topic]: { ..._state[_topic], ...(newState || {}) }
    });
    _dispatcher.notifySubscribers(_topic, getState<K>());
    return getState<K>();
  };

  const getState = <K extends any>() => {
    return _state[_defaultTopic] as K;
  };

  const clear = () => {
    _state = {
      [_defaultTopic]: Object.assign({}, initialState || {})
    };
    _dispatcher.notifySubscribers(_defaultTopic, getState());
  };

  return {
    getState,
    update,
    subscribe,
    unsubscribe,
    clear
  };
};

export default Store;
