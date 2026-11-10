export const actions = new Proxy(
  {},
  {
    get: () => async () => ({data: undefined, error: undefined}),
  },
);

export const isInputError = () => false;
