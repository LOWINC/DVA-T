import {call} from "redux-saga/effects";

export function callFun<F extends (...args: any) => any>(
  fun: F,
  ...params: Parameters<F>
) {
  return call(fun, ...params);
}
