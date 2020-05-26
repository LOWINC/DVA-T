# dva 事件类型包裹

## 安装

> yarn add @lowinc/dva-t

## 使用

> store: index.ts

```ts
import {create,call,put} from "@lowinc/dva-t";

import user from "./user.ts";
import shop from "./shop.ts";
import address from "./address.ts";

// dva辅助函数
export const Dva = {
  helpers: {
    call,
    put
  },
  User: create(user),
  Shop: create(shop),
  Address: create(address),
};


```
