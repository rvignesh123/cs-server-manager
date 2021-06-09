import * as MT from "./mapsType";

const initialState = {
  maps: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MT.MAPS_LIST_REQUEST:
      return {
        ...state,
      };
    case MT.MAPS_SUCCESS:
      return {
        maps: action.payload,
        error: "",
      };
    case MT.MAPS_FAILURE:
      return {
        maps: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
