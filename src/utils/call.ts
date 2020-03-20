import {call as sagaCall} from "redux-saga/effects";

export function call<F extends (...args: any) => any>(
  fun: F,
  ...params: Parameters<F>
) {
  return sagaCall(fun, ...params);
}
