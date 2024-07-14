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
} from "./types"
import setAelrt from "./alert"
import axios from "axios"

export const Sign_Up = (first_name,last_name,email,password,re_password) => async (dispatch) =>{
    dispatch({
        type : SET_AUTH_LOADING
    })

    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    })

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config)
      try {
        if (res.status === 200)
       { dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        dispatch (setAelrt("por favor ingrese a su email para poder activar la cuenta","green"))
        }else {
            dispatch({
                type:SIGNUP_FAIL
            })
            dispatch (setAelrt("error no se ha podido realizar el registro de la cuenta","red"))

        }
        
      } catch (error) {
        dispatch({
            type:SIGNUP_FAIL
        })
        dispatch (setAelrt("error no se ha podido realizar el registro de la cuenta","red"))

      }
}




export const Load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
      const config = {
          headers: {
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
  
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
      
          if (res.status === 200) {
              dispatch({
                  type: USER_LOADED_SUCCESS,
                  payload: res.data
              });
          } else {
              dispatch({
                  type: USER_LOADED_FAIL
              });
          }
      }
      catch(err){
          dispatch({
              type: USER_LOADED_FAIL
          });
      }
  } else {
      dispatch({
          type: USER_LOADED_FAIL
      });
  }
  };