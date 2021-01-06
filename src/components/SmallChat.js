import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDialogues } from "../ducks/dialogues"
import { Icon, Input } from "semantic-ui-react"
import { dialoguesApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import $ from "jquery"
import styles from "./styles/SmallChat.module.css"

const SmallChat = (props) => {
  const [visible, setVisible] = useState(true)
  const [chatOpened, setChatOpened] = useState(false)
  const [dialog, setDialog] = useState({})
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const dialogues = useSelector((state) => state.dialogues)
  const profile = useSelector((state) => state.profile)
  const {
    ws,
    messages,
    setMessages,
    msggs,
    mss,
    onAddMessage,
    onSetMessages,
    onCleanMessages,
  } = props
  const onGetDialogues = () => {
    dispatch(getDialogues())
  }
  const getMessages = (id) => {
    apiGet(dialoguesApi + id + "/messages/", { dialog_id: id })
      .onStatus((res) => {
        const msgs = []
        res.data.results
          .slice(0)
          .reverse()
          .map((q) => {
            msgs.push(q)
            msggs.push(q)
          })
        // onSetMessages(res.data.results)
        console.log(msggs)
        setMessages(msgs.map((q) => q))
        $("#messages").scrollTop($("#messages")[0].scrollHeight)
      }, 200)
      .onFail(() => {
      })
      .afterAll(() => {
      })
      .startSingle()
  }
  useEffect(() => {
    onGetDialogues()
    return () => {
    }
  }, [])
  const chatRender = () => {
    return (
      <>
        <div className={styles.chatContainer}>
          <div className={styles.head}>
            <div className={styles.icon}>
              {/*{dialog.chat_participant.user.avatar ? (*/}
              {/*  <img src={transAvatarUrl(dialog.chat_participant.user.avatar)} />*/}
              {/*) : (*/}
              <img src={"https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"} />
              {/*)}*/}
            </div>
            {dialog.chat_participant.user.first_name !== "not_given" &&
            dialog.chat_participant.user.first_name !== "not_giiven"
              ? dialog.chat_participant.user.first_name
              : ""}{" "}
            {dialog.chat_participant.userlast_name !== "not_given" &&
            dialog.chat_participant.user.last_name !== "not_giiven"
              ? dialog.chat_participant.user.last_name
              : ""}
          </div>
          <div id="messages" style={{ width: 300, height: 220, overflowY: "scroll" }}>
            {messages.map((q) => (
              <>
                <div style={{
                  display: "flex",
                  overflowX: "hidden",
                  justifyContent:
                    q.from_user.email === profile.email
                      ? "flex-end"
                      : "flex-start",
                }}>
                  <div
                    style={{
                      color: "black",
                      position: "relative",
                      width: 185,
                      backgroundColor: q.from_user.email === profile.email ? "#F5F6F8" : "white",
                      border: q.from_user.email === profile.email ? "none" : "1px solid #C2CFE0",
                      margin: 10,
                      borderRadius: 15,
                      padding: 10,
                      wordWrap: "break-word",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        paddingLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      {q.text}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div
            style={{
              width: 300,
              height: 50,
              backgroundColor: "#f8f8f8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              value={text}
              onChange={(e, d) => {
                setText(d.value)
              }}
            >
              <input
                style={{
                  marginRight: 10,
                  height: 32,
                  width: 230,
                  boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.15)",
                  borderRadius: 16,
                }}
                placeholder="Написать сообщение..."
              />
            </Input>
            <Icon
              name="send"
              color="grey"
              onClick={() => {
                apiPost(dialoguesApi + dialog.id + "/messages/", {
                  text,
                })
                  .onStatus((res) => {
                  }, 200, 201, 203, 204)
                  .onFail(() => {
                  })
                  .afterAll(() => {
                    $("#messages").scrollTop($("#messages")[0].scrollHeight)
                    setText("")
                  })
                  .startSingle()
              }}
            />
          </div>
        </div>
      </>
    )
  }
  console.log("dialogues.data.")
  console.log(dialogues.data)
  const dialogsRender = () => {
    return (
      <>
        <div className={styles.dialogueContainer}>
          <div
            style={{
              height: 56,
              width: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f6f8",
            }}
          >
            <Input iconPosition="left">
              <Icon name="search" />
              <input
                placeholder="Поиск"
                style={{
                  border: "1px solid #C2CFE0",
                  boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.15)",
                  borderRadius: 8,
                }}
              />
            </Input>
          </div>
          {dialogues.data.map((q) => {
            if (!q.chat_participant) return <></>
            return (
              <>
                <div
                  className={styles.dialogueUser}
                  style={{ backgroundColor: (chatOpened && q.id === dialog.id) ? "#ccdeff" : "#ffffff", }}
                  onClick={(e) => {
                    if (q.id === dialog.id) {
                      setDialog({})
                      setChatOpened(false)
                    } else {
                      setChatOpened(true)
                      setDialog(q)
                      getMessages(q.id)
                    }
                  }}
                >
                  <img src={"https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"} />
                  {q.chat_participant.user.first_name !== "not_given" &&
                  q.chat_participant.user.first_name !== "not_giiven"
                    ? q.chat_participant.user.first_name
                    : ""}{" "}
                  {q.chat_participant.user.last_name !== "not_given" &&
                  q.chat_participant.user.last_name !== "not_giiven"
                    ? q.chat_participant.user.last_name
                    : ""}
                </div>
              </>
            )
          })}
        </div>
      </>
    )
  }
  const background = (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: 98,
        }}
        onClick={() => {
          setVisible(false)
        }}
      />
    </>
  )
  return (
    <>
      {visible ? background : <></>}
      {visible ? dialogsRender() : <></>}
      {visible && chatOpened ? chatRender() : <></>}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "#005cff",
          width: 60,
          height: 60,
          border: "0px solid red",
          borderRadius: 40,
          zIndex: 100,
          boxShadow: "0 0 10px #005cff",
          transition: "0.1s",
        }}
        onClick={() => {
          setVisible(!visible)
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "white"
        }}
        onMouseLeave={(e) => {
          if (visible) return
          e.target.style.backgroundColor = "#005cff"
        }}
      >
        <img
          src="./assets/img/chat/chatbot.png"
          style={{ width: "100%", height: "100%", borderRadius: 30 }}
        />
      </div>
    </>
  )
}

export default SmallChat
