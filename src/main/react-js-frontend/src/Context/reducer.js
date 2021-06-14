import axios from "axios";
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).username
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).accessToken
  : "";

let tokenType = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).tokenType
  : "";

if (token) {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `${tokenType} ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.username,
        token: action.payload.accessToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
