# dva事件类型包裹

## 安装

> yarn add @lowinc/dva-t

## 使用





> store: user.ts

```ts
import { createEffect, createSave, callFun } from '@lowinc/dva-t';

// 自己和其他模块调用
export const { put, action } = createEffect<typeof moduleUser.effects>('user');
export const save = createSave<typeof moduleUser.state>('user');

const moduleUser = {
  namespace: "user",
  state: {
    type: 'user',
    user: {
      name: 'lowinc',
      age: 100,
    },
  },
  reducers: {
    // 和createSave关联
    // 必须有这个reducer
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *testCall({}, {}) {
      yield callFun(Taro.showToast, { title: 'asd', icon: 'none' });
      yield put('foo', { payload: { name: 'swq', age: 10 } });
    },
    *foo(params: { payload: { name: string; age: number } }) {
      yield put('bar', { payload: { id: '1', age: 10 } });
    },
    *bar(params: { payload: { id: string; age: number } }) {
      yield save('user', { name: 'swq', age: 18 });
    },
  }
};


// store.ts
export default moduleUser;


```

> page: user.tsx

```ts

  useDidShow(() => {
    props.dispatch(action('testCall', { payload: {} }));
  });

```
