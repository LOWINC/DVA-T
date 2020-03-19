import {put} from "redux-saga/effects";

export function createSave<S>(namespace) {
  return function<K extends keyof S>(key: K, value: S[K]) {
    return put({
      type: `${namespace}/save`,
      payload: {
        [key]: value
      }
    });
  };
}
