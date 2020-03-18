export function createSave<S>() {
  return function<K extends keyof S>(key: K, value: S[K]) {
    return {
      type: "save",
      payload: {
        [key]: value
      }
    };
  };
}
