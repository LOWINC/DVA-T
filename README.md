# dva事件类型包裹

## 安装

> yarn add @lowinc/dva-t

## 使用

> store: user.ts

```ts
import { createEffect, createSave, call, after } from '@lowinc/dva-t';

// 自己和其他模块调用
export const { put, action } = createEffect<typeof modelUser.effects>('user');
export const save = createSave<typeof modelUser.state>('user');
export type UserState = typeof modelUser.state;

const modelUser = {
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
      yield call(Taro.showToast, { title: 'asd', icon: 'none' });
      yield put('testFoo', { payload: { name: 'swq', age: 10 } });
    },
    *testFoo(params: { payload: { name: string; age: number } }) {
      yield put('testBar', { payload: { id: '1', age: 10 } });
    },
    *testBar(params: { payload: { id: string; age: number } }) {
      yield save('user', { name: 'root', age: 18 });
    },
    *testAfter(params: { payload: { id: string; age: number } }) {
      const res = yield after(
        'user/testBar',
        (store:UserState) => store.type,
        data => data.name === 'root',
      );
      console.log('after res', res);
    },
  }
};


// store.ts
export default modelUser;


```

> page: user.tsx

```ts

  useDidShow(() => {
    props.dispatch(action('testCall', { payload: {} }));
  });

```
