import { createAction, handleActions } from "redux-actions"
import { apiPost, apiGet } from "../utils/apiConnector"

const defaultState = {
  data: [],
}

const setParticipants = createAction("SET_PARTICIPANTS")
const addParticipant = createAction("ADD_PARTICIPANT")
const deleteParticipant = createAction("DELETE_PARTICIPANT")

const reducer = handleActions(
  {
    [setParticipants]: (state, { payload }) => ({ ...state, data: payload }),
    [addParticipant]: (state, { payload }) => ({
      ...state,
      data: state.data.push(payload),
    }),
    [deleteParticipant]: (state, { payload }) => ({
      ...state,
      data: state.data.filter((q) => q !== payload),
    }),
  },
  defaultState,
)

export default reducer
