import axios from "axios";

import { QUERY_PAPERS, GET_MY_PAPERS } from "./types";

export const queryPapers = (imf, from, to, authorType) => async (dispatch) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/paper?from=${from}&to=${to}&imf=${imf}&authorType=${authorType}`
    );
    dispatch({
      type: QUERY_PAPERS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMyPapers = () => async (dispatch) => {
  try {
    const result = await axios.get(
      "http://localhost:5000/api/paper/getmypapers"
    );
    dispatch({
      type: GET_MY_PAPERS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
