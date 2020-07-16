export {put, call} from "redux-saga/effects";

export interface Params<T> {
  payload: T;
  [key: string]: any;
}

// Params
// const store = {
//   effects: {
//     fetch(params: Params<{name: string}>) {},
//   },
// };

type Mode = {
  namespace: any;
  state: any;
  reducers: any;
  effects: any;
};

type ActionPayload<T> = T extends (payload: infer P, dvaUtil?: any) => any
  ? P
  : T;
type Action<R extends any> = {
  [K in keyof R]: (params: ActionPayload<R[K]>) => {type: string; payload: any};
};

type MutationPayload<T> = T extends (store: any, payload: infer P) => any
  ? P
  : T;
type Mutation<R extends any> = {
  [K in keyof R]: (
    params: MutationPayload<R[K]>
  ) => {type: string; payload: any};
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
