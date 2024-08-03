
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "../actions/types";

const initialState = {
  categorias: null,
  loading: false,
  //esto es lo que aparece en redux
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;

  switch (key) {
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

      case GET_CATEGORIES_SUCCESS:
        return {
            ...state,
            categorias : payload.categoria
        }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categorias : null
            }

    default:
      state;
  }
}
