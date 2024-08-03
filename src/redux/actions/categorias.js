import { type } from "@testing-library/user-event/dist/type"
import {
GET_CATEGORIES_SUCCESS,
GET_CATEGORIES_FAIL,
SET_AUTH_LOADING,
REMOVE_AUTH_LOADING }
from "./types"
import axios from "axios"

export const get_categorias = () => async (dispatch) => {
    dispatch(SET_AUTH_LOADING)
    const config = {
        headers: {
            "accept" : "application/json",
            "authorization" : "application/json"
        }
    }

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Categorias/categories`,
      body,
      config)
      try {
        if (res.status === 200)
            {
              dispatch(
                  type = GET_CATEGORIES_SUCCESS,
                  payload =  res.data
              )
              dispatch(REMOVE_AUTH_LOADING)
            }
            else{
              dispatch(
                  type = GET_CATEGORIES_FAIL,
              )
              dispatch(REMOVE_AUTH_LOADING)
            }
      } catch (error) {
        dispatch(
            type = GET_CATEGORIES_FAIL,
        )
        dispatch(REMOVE_AUTH_LOADING)
      }
      }
   
