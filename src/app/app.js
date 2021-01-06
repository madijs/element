import React from "react"
import Router from "../routes/index"
import "./styles/styles.css"
import Layout from "../pages/Layout"
import { HashRouter } from "react-router-dom"
import "react-notifications-component/dist/theme.css"
import 'react-notifications/lib/notifications.css'

const App = () => {
  return (
    <>
      <HashRouter>
        <Layout>
          <Router />
        </Layout>
      </HashRouter>
    </>
  )
}

export default App
