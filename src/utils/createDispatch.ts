export function createDispatch<Effects extends any>(namespace?: string) {
  return function<Type extends keyof Effects>(
    type: Type,
    payload: Parameters<Effects[Type]>[0]
  ) {
    return {
      type: namespace ? `${namespace}/${type}` : type,
      payload: ((payload || {}) as any).payload
    };
  };
}
