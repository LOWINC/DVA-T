export {put, call} from "redux-saga/effects";

type Mode = {
  namespace: any;
  state: any;
  reducers: any;
  effects: any;
};

type Action<R extends any> = {
  // TODO: jest 类型错误
  // [K in keyof R]: (params: any) => {type: string; payload: any};
  [K in keyof R]: (params: Parameters<R[K]>[0]) => {type: string; payload: any};
};

type Mutation<R extends any> = {
  // TODO: jest 类型错误
  // [K in keyof R]: (params: any) => {type: string; payload: any};
  [K in keyof R]: (params: Parameters<R[K]>[1]) => {type: string; payload: any};
};

export function create<M extends Mode>(model: M) {
  const actionKeys = Object.keys(model.effects);
  const actions: Action<M["effects"]> = actionKeys.reduce((action, func) => {
    action[func] = (params) => ({
      type: `${model.namespace}/${func}`,
      payload: params.payload,
    });
    return action;
  }, {} as any);

  const mutationKeys = Object.keys(model.reducers);
  const mutations: Mutation<M["reducers"]> = mutationKeys.reduce(
    (mutation, func) => {
      mutation[func] = (params) => ({
        type: `${model.namespace}/${func}`,
        payload: params.payload,
      });

      return mutation;
    },
    actions as any
  );

  return {
    ...mutations,
    ...actions,
  };
}
