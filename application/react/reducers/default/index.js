export default function content(state = [], action = null) {
  let response;
  const initialState = [];

  if (!action) {
    return initialState;
  }

  switch (action.type) {
    default:
      response = state;
  }

  return response;
}
