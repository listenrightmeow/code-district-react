export default function content(state = {}, action = null) {
  let response;
  const initialState = { data: {}, update: +new Date() };

  if (/([@]{2,})/.test(action.type)) {
    return initialState;
  }

  switch (action.type) {
    case 'SUCCESS':
      console.log(action.payload, 'payload');

      response = Object.assign({}, state, {
        data: action.payload
      });
    break;
    default:
      response = state;
  }

  return response;
}
