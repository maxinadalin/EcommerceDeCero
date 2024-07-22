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

export const Activate = (iud,token) = async (dispatch) => {
    const config = {
        headers : ({
            "Authorization" : "application/json"
        })
    }
    const body = JSON.stringify({
        uid,
        token
    })
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/activation/`,
      body,
      config)

      try {
        if (res.data === 200) {
            dispatch({
                type:ACTIVATION_SUCCESS,
                payload:res.data
            })
            dispatch(setAelrt("activacion realizada con exito","green"))

        }
        else{
            dispatch({
                type:ACTIVATION_FAIL,
            })
            dispatch(setAelrt("no se pudo realizar la activacion","red"))
        }
        
      } catch (error) {
        dispatch({
            type:ACTIVATION_FAIL,
        })
        dispatch(setAelrt("no se pudo realizar la activacion","red"))

      }
}


export const Load_user = () => async (dispatch) => {
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

export const Sign_In = (email,password) = async (dispatch) =>{
    dispatch({
        type:SET_AUTH_LOADING
    })
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
    const body = JSON.stringify({
        email,
        password
    })

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/jwt/create/`,
      body,
      config)

      try {
        if (res.status === 200) {
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            dispatch(Load_user())
            dispatch(setAelrt("inicio de sesion realizado con exitos","green"))
            dispatch({
                type:REMOVE_AUTH_LOADING
            })
        }
        else{
            dispatch({
                type:LOGIN_FAIL
            })
            dispatch(setAelrt("ha ocurrido un error no se ha podido iniciar sesion"))
            dispatch({
                type:REMOVE_AUTH_LOADING
            })
        }
      } catch (error) {
        dispatch({
            type:LOGIN_FAIL
        })
        dispatch(setAelrt("ha ocurrido un error no se ha podido iniciar sesion"))
        dispatch({
            type:REMOVE_AUTH_LOADING
        })
      }
}

export const refresh = () => async (dispatch) => {
    if (localStorage.getItem("refresh")) {
        const config = {
            headers : {
                "accept" : "application/json",
                "Content-Type" : "application/json"
            }
        }
        const body = JSON.stringify({
            refresh : localStorage.getItem("refresh")
        })

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/jwt/refresh/`,
      body,
      config)

      try {
        if (res.status === 200) {
            dispatch({
                type:REFRESH_SUCCESS,
                payload:res.data
            })
        }
        else{
            dispatch({
                type:REFRESH_FAIL,
            })
        }
      } catch (error) {
        dispatch({
            type:REFRESH_FAIL,
        })
      }
    }
    else{
        dispatch({
            type:REFRESH_FAIL,
        }) 
    }
}

export const logout = () => async(dispatch) =>{
    dispatch({
        type:LOGOUT
    })
    dispatch(setAelrt("la sesion fue cerrada con exito","green"))
}

export const Reset_Password = (email) => async (dispatch) => {
    dispatch({
        type:SET_AUTH_LOADING
    })

    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
    const body = JSON.stringify({
        email
    })

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset_password/`,
        body,
        config)

    try {
        if (res.status === 200) {
            dispatch({
                type:RESET_PASSWORD_SUCCESS,
                payload:res.data
            })
            dispatch({
                type:REMOVE_AUTH_LOADING
            })
            dispatch(setAelrt("hemos enviado un email para que realices el cambio de la contraseña","green"))
        }
        else{
            dispatch({
                type:RESET_PASSWORD_FAIL,
            })
            dispatch({
                type:REMOVE_AUTH_LOADING
            })
            dispatch(setAelrt("no se ha podido completar el envio para la restauracion de la contraseña","red"))
       
        }
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
        })
        dispatch({
            type:REMOVE_AUTH_LOADING
        })
        dispatch(setAelrt("no se ha podido completar el envio para la restauracion de la contraseña","red"))
   
    }
}

export const Reset_Password_Confirm = (uid,token,new_password,re_new_password) =>async (dispatch) =>{
    dispatch({
        type:SET_AUTH_LOADING
    })
    
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password    })

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset_password_confirm/`,
        body,
        config)
    
        try {
            if (res.status === 200) {
                dispatch({
                    type:RESET_PASSWORD_CONFIRM_SUCCESS,
                    payload:res.data
                })
                dispatch({
                    type:REMOVE_AUTH_LOADING
                })
                dispatch(setAelrt("contraseña modificada con exito","green"))  
            }
            else{
                dispatch({
                    type:RESET_PASSWORD_CONFIRM_FAIL,
                })
                dispatch({
                    type:REMOVE_AUTH_LOADING
                })
                dispatch(setAelrt("no se ha podido completar el envio para la restauracion de la contraseña","red"))
            }
        } catch (error) {
            dispatch({
                type:RESET_PASSWORD_CONFIRM_FAIL,
            })
            dispatch({
                type:REMOVE_AUTH_LOADING
            })
            dispatch(setAelrt("no se ha podido completar el envio para la restauracion de la contraseña","red"))
        }
}

export const Check_Authenticated = () => async (dispatch) => {
    if (localStorage.getItem(("access"))){
        const config = {
            headers : {
                "accept" : "application/json",
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({
            token : localStorage.getItem("access")
        })

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
                body,
                config
              );
              if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                })
              }
              else{
                dispatch({
                    type: AUTHENTICATED_FAIL,
                })
              }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            })
        }
   
    }
    else{
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
}