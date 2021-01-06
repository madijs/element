import * as types from '../types/forgotPasswordTypes'
import AuthService from "../services/authentication"

export const forgotPasswordAction = (email) => async dispatch => {
  dispatch({
    type: types.FORGOT_PASSWORD_PENDING
  })
  await new AuthService().forgotPasswordService(email).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
}