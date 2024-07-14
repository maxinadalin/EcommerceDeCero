import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"), //estas dos variables lo que hacen es llamar del localstorage y ver si existen para agarrar las variables
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  // user: null,
  loading: false,
  //esto es lo que aparece en redux
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };

    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };

    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null, //estas dos variables lo que hacen es llamar del localstorage y ver si existen para agarrar las variables
        refresh: null,
        isAuthenticated: null,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
