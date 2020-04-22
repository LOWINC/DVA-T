import {put} from "redux-saga/effects";

function createPut<Effects extends any>(namespace: string) {
  return function <Type extends keyof Effects>(
    type: Type,
    payload: Parameters<Effects[Type]>[0],
    resolve = false
  ) {
    const putEffect = resolve ? (put as any).resolve : put;

    return putEffect({
      type: `${namespace}/${type}`,
      payload: ((payload || {}) as any).payload || {},
    });
  };
}

function createAction<Effects extends any>(namespace: string) {
  return function <Type extends keyof Effects>(
    type: Type,
    payload?: Parameters<Effects[Type]>[0]
  ) {
    return {
      type: `${namespace}/${type}`,
      payload: ((payload || {}) as any).payload || {},
    };
  };
}

export function createEffect<T>(namespace: string) {
  return {
    put: createPut<T>(namespace),
    action: createAction<T>(namespace),
  };
}
