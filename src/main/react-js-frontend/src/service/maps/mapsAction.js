import * as MT from "./mapsType";
import axios from "axios";

export const fetchMaps = () => {
  return (dispatch) => {
    dispatch({
      type: MT.MAPS_LIST_REQUEST,
    });
    axios
      .post("http://localhost:8080/maps/fetchMaps")
      .then((response) => {
        dispatch(mapsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(mapsFailure(error));
      });
  };
};

const mapsSuccess = (maps) => {
  return {
    type: MT.MAPS_SUCCESS,
    payload: maps,
  };
};

const mapsFailure = (error) => {
  return {
    type: MT.MAPS_FAILURE,
    payload: error,
  };
};
