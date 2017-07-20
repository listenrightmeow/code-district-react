/* eslint no-nested-ternary: 0 */
import fetch from 'common/helpers/fetch';

const helpers = {
  events: {
    failure: (error) => {
      return {
        type: 'FAILURE',
        payload: {
          status: error.response.status,
          statusText: error.response.statusText
        }
      }
    },
    loading: () => {
      return { type: 'LOADING' }
    },
    success: (payload) => {
      return {
        type: 'SUCCESS',
        payload: payload,
      }
    }
  },
  uri: () => {
    return `https://api.github.com/graphql`;
  }
}

const queries = {
  user: {
    operationName: null,
    query: "{\
      viewer {\
        name\
        login\
        email\
        company\
        organizations(last: 100) {\
          edges {\
            node {\
              name\
              login\
            }\
          }\
        }\
        avatarUrl\
        createdAt\
        location\
        url\
        isDeveloperProgramMember\
      }\
    }",
    variables: "{}"
  }

}

export function load(query) {
  const uri = helpers.uri();

  return (dispatch) => {
    dispatch(helpers.events.loading());

    fetch.post(uri, queries[query]).then((response) => {
      const valid = response.status === 200;

      if (!!valid) {
        Object.keys(response.payload).map(function(key) {
          try {
            response.payload[key] = JSON.parse(response.payload[key]);
          } catch(error) {}
        });
      }

      const payload = !!valid ? helpers.events.success(response.payload) : helpers.events.failure(response);

      dispatch(payload);
    });
  };
}
