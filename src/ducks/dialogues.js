import { createAction, handleActions } from "redux-actions"
import { apiPost, apiGet } from "../utils/apiConnector"
import { dialoguesApi } from "../config/apiUrls"

const defaultState = {
  data: [],
}

const setDialogues = createAction("SET_DIALOGUES")
const addDialog = createAction("ADD_DIALOG")
const deleteDialog = createAction("DELETE_DIALOG")

const reducer = handleActions(
  {
    [setDialogues]: (state, { payload }) => ({ ...state, data: payload }),
    [addDialog]: (state, { payload }) => ({
      ...state,
      data: state.data.push(payload),
    }),
    [deleteDialog]: (state, { payload }) => ({
      ...state,
      data: state.data.filter((q) => q !== payload),
    }),
  },
  defaultState,
)

export default reducer

export const getDialogues = () => {
  return (dispatch, getState) => {
    apiGet(dialoguesApi, {})
      .onStatus(
        (res) => {
          dispatch(setDialogues(res.data.results))
        },
        200,
        201,
        203,
        204,
      )
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
}
