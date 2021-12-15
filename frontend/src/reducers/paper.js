import { QUERY_PAPERS, GET_MY_PAPERS } from "../actions/types";

const initialState = {
  myPapers: null,
  queriedPapers: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case QUERY_PAPERS:
      return {
        ...state,
        queriedPapers: payload,
      };
    case GET_MY_PAPERS:
      return {
        ...state,
        myPapers: payload,
      };

    default:
      return state;
  }
}
