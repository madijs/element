import { createAction, handleActions } from "redux-actions"
import { apiPost, apiGet } from "../utils/apiConnector"
import { chatApi } from "../config/apiUrls"

const defaultState = {
  id: -1,
  data: [],
}

const setMessages = createAction("SET_MESSAGES")
const addMessage = createAction("ADD_MESSAGE")
const deleteMessage = createAction("DELETE_MESSAGE")
const setId = createAction("SET_ID")

const reducer = handleActions(
  {
    [setId]: (state, { payload }) => ({ ...state, id: payload }),
    [setMessages]: (state, { payload }) => ({ ...state, data: payload }),
    [addMessage]: (state, { payload }) => ({
      ...state,
      data: [...state.data.push(payload)],
    }),
    [deleteMessage]: (state, { payload }) => ({
      ...state,
      data: [...state.data.filter((q) => q !== payload)],
    }),
  },
  defaultState,
)

export const addfMessage = (message) => {
  return (dispatch, {}) => {
    addMessage(message)
  }
}

export const setfMessages = (msg) => {
  return (dispatch, {}) => {
    setMessages(msg)
  }
}

export const cleanfMessages = () => {
  return (dispatch, {}) => {
    setMessages([])
  }
}

export const setfId = (id) => {
  return (dispatch, {}) => {
    setId(id)
  }
}

export default reducer
