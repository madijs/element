import checkpropTypes from "check-prop-types"
import { applyMiddleware, createStore } from "redux"
import rootReducer from "../ducks"
import { middlewares } from "../store/store"

export const findByDataTest = (jsx, attr) => {
  const wrapper = jsx.find(`[data-test="${attr}"]`)
  return wrapper
}

export const checkProps = (component, expectedProps) => {
  const propsErr = checkpropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name,
  )
  return propsErr
}

export const testStore = (initState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleware(rootReducer, initState)
}
