import {take, select} from "redux-saga/effects";

export function* after(effect, selector, judger) {
  let res = yield select(selector);
  const isPass = !!judger(res);
  if (!isPass) {
    yield take(`${effect}/@@end`);
    res = yield select(selector);
  }
  return res;
}
