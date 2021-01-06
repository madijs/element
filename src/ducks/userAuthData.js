import { createAction, handleActions } from "redux-actions"

const defaultState = {
  login: "",
  pass: "",
}

const setUserAuthData = createAction("SET_USERAUTH_DATA")

const reducers = handleActions(
  {
    [setUserAuthData]: (state, { payload }) => true, // console.log("5558 ", payload),
  },
  defaultState,
)
export default reducers

export const takeUserAuthData = (data) => {
  return (dispatch) => {
    dispatch(setUserAuthData(data))
  }
}
