import {createEffect} from "./createEffect";
import {createSave} from "./createSave";

interface Model {
  namespace: string;
  state: object;
  effects: object;
}

export function create<T extends Model>(model: T) {
  const {put, action} = createEffect<T["effects"]>(model.namespace);
  const save = createSave<T["state"]>(model.namespace);
  return {
    put,
    action,
    save,
  };
}
