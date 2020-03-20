import {take, select} from "redux-saga/effects";

type Selector<T> = (store: any) => T;

// TODO:
// 1. effect 提示
// 2. once
export function* after<T>(
  effect: string,
  selector: Selector<T>,
  judger: (params: ReturnType<Selector<T>>) => boolean
) {
  let res = yield select(selector);
  const isPass = !!judger(res);
  if (!isPass) {
    yield take(`${effect}/@@end`);
    res = yield select(selector);
  }
  return res;
}
