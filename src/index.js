import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./app/app"
import * as serviceWorker from "./serviceWorker"
import store from "./store/store"
import moment from "moment"
import { restoreSession } from "./ducks/profile"
import { Provider } from "react-redux"
import "./app/styles/styles.css"
import "./app/i18n"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "pure-react-carousel/dist/react-carousel.es.css"

const app = document.getElementById("root")
store.dispatch(restoreSession())
moment.locale("ru")

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,

  app,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
