import {put} from "redux-saga/effects";

export {call} from "./utils/call";

type Mode = {
  namespace: any;
  state: any;
  reducers: any;
  effects: any;
};

type Action<R extends any> = {
  [K in keyof R]: (params: Parameters<R[K]>[0]) => ReturnType<R[K]>;
};

type Mutation<R extends any> = {
  [K in keyof R]: (params: Parameters<R[K]>[1]) => {type: string; payload: any};
};

export function create<M extends Mode>(model: M) {
  const actionKeys = Object.keys(model.effects);
  const actions: Action<M["effects"]> = actionKeys.reduce((action, func) => {
    action[func] = (params, option?: {resolve?: boolean}) => {
      const isResolve = option && option.resolve;
      const currentPut = isResolve ? (put as any).resolve : put;
      return currentPut({
        type: `${model.namespace}/${func}`,
        payload: params.payload,
      });
    };
    return action;
  }, {} as any);

  const mutationKeys = Object.keys(model.reducers);
  const mutations: Mutation<M["reducers"]> = mutationKeys.reduce(
    (mutation, func) => {
      mutation[func] = (params) => ({
        type: `${model.namespace}/${func}`,
        payload: params,
      });

      return mutation;
    },
    {} as any
  );

  return {
    actions,
    mutations,
  };
}
