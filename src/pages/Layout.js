import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { useTranslation } from "react-i18next"

import { Dimmer, Segment, Sidebar } from "semantic-ui-react"

import { hasEnoughPermissions } from "../config/permissions"
import { signOut } from "../ducks/profile"
import { closeMessage } from "../ducks/alerts"

import AlertsHolder from "../components/AlertsHolder"
import LoginPage from "./LoginPage"
import SidebarMenu from "../components/SidebarMenu"
import { SidebarMenuItem, sidebarMenuItems } from "../config/sidebarMenuItems"
import TopMenu from "../components/TopMenu"
import RegistrationPage from "./RegistrationPage"
import LeftMenu from "../components/LeftMenu"
import SmallChat from "../components/SmallChat"
import ReactNotification from "react-notifications-component"
import { NotificationContainer } from "react-notifications"

import { apiGet } from "../utils/apiConnector"
import { shwepsMyProfileApi } from "../config/apiUrls"
import {
  addfMessage,
  setfMessages,
  cleanfMessages,
  setfId,
} from "../ducks/lessonMessages"
import { deleteMinuses } from "../utils/logical"
import {
  noduxMessages,
  setnMessages,
  addnMessages,
  cleannMessages,
  setnID,
} from "../nodux/noduxMessages"
import $ from "jquery"
import ForgotPassword from "./ForgotPasswordPage"

let ws = undefined
const msggs = []
const ntfctns = []
const cls = { f: (o) => {} }

const Layout = (props) => {
  const [messages, setMessages] = useState([])
  const [notifications, setNotifications] = useState([])
  const [uuid, setUuid] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const { t } = useTranslation()

  const { profile, alerts, lessonMessages } = useSelector((state) => ({
    profile: state.profile,
    alerts: state.alerts,
    lessonMessages: state.lessonMessages,
  }))

  const [sidebarOpened, setSidebarOpened] = useState(false)

  const getUuid = () => {
    apiGet(shwepsMyProfileApi, {})
      .onStatus(
        (res) => {
          console.log(res.data)
          setUuid(res.data.id)
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

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
  }

  const navigateHome = () => {
    history.push("/")
    setSidebarOpened(false)
  }

  const onSignOut = () => {
    dispatch(signOut())
  }

  const onAlertClick = (id) => {
    dispatch(closeMessage(id))
  }

  const onAddMessage = (message) => {
    dispatch(addfMessage(message))
  }

  const onSetMessages = (ms) => {
    dispatch(setfMessages(ms))
  }

  const onSetId = (id) => {
    dispatch(setfId(id))
  }

  const onCleanMessages = () => {
    dispatch(cleanfMessages())
  }

  const { children } = props

  const { pathname } = useLocation()

  useEffect(() => {
    getUuid()
    return () => {}
  }, [])
  if (
    profile.elementProfile
      ? profile.elementProfile.user_id
        ? profile.elementProfile.user_id && !ws
        : false
      : false
  ) {
    const temp = profile.elementProfile.user_id
    ws = new WebSocket(
      "wss://api.nuntius.elementschool.kz/ws/dialogue/" +
        deleteMinuses(temp) +
        "/",
    )
    ws.onopen = (event) => {
      console.log(event)
    }
    ws.onmessage = (event) => {
      const ev = JSON.parse(event.data)
      if (ev.type === "dialogue_new_message") {
        const d = JSON.parse(ev.dialogue)
        msggs.push(d.top_message)
        if (noduxMessages.id === d.id) {
          onAddMessage(d.top_message)
          addnMessages(d.top_message)
          noduxMessages.tmpFunction(-1)
          noduxMessages.downScroll()
        } else {
          $("#messages").scrollTop($("#messages")[0].scrollHeight)
          setMessages(msggs.map((q) => q))
        }
      } else if (ev.type === "lesson_notification") {
        const lesson = JSON.parse(ev.lesson)
        if (ntfctns.filter((q) => lesson.id === q.id).length) return
        cls.f(true)
        console.log(lesson)
        ntfctns.push(lesson)
        setNotifications(ntfctns)
      }
      console.log(event)
    }
    ws.onclose = (event) => {
      console.log(event)
    }
  }
  if (!profile.signedIn) {
    return (
      <div>
        {
          //<AlertsHolder top alerts={alerts} onAlertClick={onAlertClick} />
        }
        <NotificationContainer />
        {pathname === "/registration" ? (
          <RegistrationPage />
        ) :(pathname === "/" ? (
          <>
            <LoginPage />
          </>
        ):(pathname === "/forgotPassword" && (
          <>
            <ForgotPassword/>
          </>
        )))
        }
      </div>
    )
  }
  const sidebarMenuItemsList = sidebarMenuItems.filter(
    (item) =>
      // hasEnoughPermissions(profile.permissions, item.route.permissions),
      item,
  )
  sidebarMenuItemsList.push(SidebarMenuItem(null, t("Выйти"), null, onSignOut))

  return (
    <div style={{ height: "100%" }}>
      <ReactNotification />
      <NotificationContainer />
      <TopMenu
        profile={profile}
        toggleSidebar={toggleSidebar}
        onSignOut={onSignOut}
        navigateHome={navigateHome}
        ws={ws}
        notifications={notifications}
        setNotifications={setNotifications}
        ntfctns={ntfctns}
        history={history}
        cls={cls}
      />
      <LeftMenu />
      <SmallChat
        ws={ws}
        setMessages={setMessages}
        messages={messages}
        msggs={msggs}
        onAddMessage={onAddMessage}
        onCleanMessages={onCleanMessages}
        onSetMessages={onSetMessages}
        mss={lessonMessages}
      />
      <div style={{ marginTop: 60, marginLeft: 70 }}>{children}</div>
    </div>
  )
}

export default Layout
