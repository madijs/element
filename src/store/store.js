import reducers from "../ducks/index"
import { applyMiddleware, createStore } from "redux"
import ReduxThunk from "redux-thunk"

export const middlewares = [ReduxThunk]
const store = createStore(reducers, applyMiddleware(...middlewares))
export default store

store.subscribe(() => {})
