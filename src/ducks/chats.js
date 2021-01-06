import { createAction, handleActions } from "redux-actions"
import { apiPost, apiGet } from "../utils/apiConnector"
import { chatApi } from "../config/apiUrls"

const defaultState = {
  data: [],
}

const setChats = createAction("SET_CHATS")
const addChat = createAction("ADD_CHAT")
const deleteChat = createAction("DELETE_CHAT")

const reducer = handleActions(
  {
    [setChats]: (state, { payload }) => ({ ...state, data: payload }),
    [addChat]: (state, { payload }) => ({
      ...state,
      data: state.data.push(payload),
    }),
    [deleteChat]: (state, { payload }) => ({
      ...state,
      data: state.data.filter((q) => q !== payload),
    }),
  },
  defaultState,
)

export default reducer

export const createChat = (callback, title, chat_type, privacy_type) => {
  return (dispatch, getState) => {
    const state = getState()
    const user_id = state.profile.profile.user_id
    const req = {
      title: title ? title : "",
      user_global_id: user_id,
      chat_type: chat_type ? chat_type : "1",
      privacy_type: privacy_type ? privacy_type : "1",
    }
    apiPost(chatApi, req)
      .onStatus(
        (res) => {
          dispatch(addChat(res.data))
        },
        200,
        201,
        203,
        204,
      )
      .onFail((res) => {
        console.log(res)
      })
      .afterAll(() => {
        callback()
      })
      .startSingle()
  }
}
