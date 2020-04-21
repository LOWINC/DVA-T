# dva 事件类型包裹

## 安装

> yarn add @lowinc/dva-t

## 使用

> store: index.ts

```ts
import {call, create} from "@lowinc/dva-t";

import user from "./user.ts";
import shop from "./shop.ts";
import address from "./address.ts";

// dva辅助函数
export const Dva = {
  helpers: {
    call,
  },
  User: create(user),
  Shop: create(shop),
  Address: create(address),
};

// store
export const modules = [user, shop, address];
```

```ts
import {Dva} from "./index";

export type UserState = typeof modelUser.state;

export default {
  namespace: "user",
  state: {
    type: "user",
    user: {
      name: "lowinc",
      age: 100,
    },
  },
  reducers: {
    // 和createSave关联
    // 必须有这个reducer
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *testCall({}, {}) {
      yield Dva.helpers.call(Taro.showToast, {title: "asd", icon: "none"});
    },
    *testFoo(params: {payload: {name: string; age: number}}) {
      yield Dva.User.put("testBar", {payload: {name: "lowinc", age: 100}});
    },
    *testBar(params: {payload: {id: string; age: number}}) {
      yield Dva.User.save("user", {name: "root", age: 18});
    },
  },
};

// store.ts
```

> page: user.tsx

```ts
import {Dva} from "@/store";
useDidShow(() => {
  props.dispatch(Dva.User.action("testCall", {payload: {}}));
});
```
