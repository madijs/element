import { createAction, handleActions } from "redux-actions"
import { find, propEq } from "ramda"
import { alertMessagesLifetime } from "../config/settings"

export const alertTypes = {
  error: "error",
  warning: "warning",
  success: "success",
}
// Default state
const defaultState = []

// Action Creators
/// addAlert(id, message, type, timeout)
const addAlert = createAction("ADD_ALERT", (id, message, type, timeout) => ({
  id,
  message,
  type,
  timeout,
}))
/// removeAlert(id)
const removeAlert = createAction("REMOVE_ALERT")

// Reducer
const reducer = handleActions(
  {
    [addAlert]: (state, { payload: { id, message, type, timeout } }) => [
      { id, message, type, timeout },
      ...state,
    ],
    [removeAlert]: (state, { payload }) =>
      state.filter((item) => !(item.id === payload)),
  },
  defaultState,
)

export default reducer

// Thunk
export const showMessage = (message, type) => {
  // eslint-disable-next-line no-empty-pattern
  return (dispatch, {}) => {
    const id = Math.random()
    const timeout = setTimeout(
      () => dispatch(removeAlert(id)),
      alertMessagesLifetime,
    )
    dispatch(addAlert(id, message, type, timeout))
  }
}

export const closeMessage = (id) => {
  return (dispatch, getState) => {
    const item = find(propEq("id", id))(getState().alerts)
    if (item) {
      clearTimeout(item.timeout)
      dispatch(removeAlert(id))
    }
  }
}
