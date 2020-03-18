import {createDispatch, createSave} from "./index";

const dispatch = createDispatch<typeof moduleUser.effects>();
const save = createSave<typeof moduleUser.state>();

const moduleUser = {
  namespace: "user",
  state: {
    type: "user",
    user: {
      name: "lowinc",
      age: 100
    }
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
    *foo(params: {payload: {name: string; age: number}}, {put}) {
      yield put(dispatch("bar", {payload: {name: "laosiji", age: 18}}));
    },
    *bar(params: {payload: {name: string; age: number}}, {put}) {
      yield put(save("type", "root"));
      yield put(save("user", {name: "laosiji", age: 18}));
    }
  }
};

// pages.tsx
export const userDispatch = createDispatch<typeof moduleUser.effects>("user");
// store.ts
export default moduleUser;
