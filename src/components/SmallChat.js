import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDialogues } from "../ducks/dialogues"
import { Input, Icon } from "semantic-ui-react"
import { dialoguesApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import $ from "jquery"
import { transAvatarUrl } from "../utils/logical"

const SmallChat = (props) => {
  const [visible, setVisible] = useState(false)
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
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    onGetDialogues()
    return () => {}
  }, [])
  const chatRender = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 301,
            width: 300,
            backgroundColor: "white",
            border: "0px solid red",
            borderRadius: 5,
            zIndex: 100,
            boxShadow: "0 0 5px #cccccc",
            transition: "0.1s",
            height: 326,
            borderTopLeftRadius: 16,
          }}
        >
          <div
            style={{
              height: 56,
              width: 300,
              backgroundColor: "#ccdeff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 16,
              fontWeight: 600,
              fontSize: 16,
              color: "#00aaf4",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#c2cecf",
                marginRight: 10,
              }}
            >
              {dialog.chat_participant.user.avatar ? (
                <>
                  <img
                    src={transAvatarUrl(dialog.chat_participant.user.avatar)}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                      backgroundColor: "aliceblue",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
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
          <div
            id="messages"
            style={{ width: 300, height: 220, overflowY: "scroll" }}
          >
            {messages.map((q) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      q.from_user.email === profile.email
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxHeight: 100,
                      color: "#005cff",
                      position: "relative",
                      cursor: "pointer",
                      width: 185,
                      boxShadow: " 0 0 4px #aaaaaa",
                      margin: 10,
                      border: "0px solid red",
                      borderRadius: 15,
                      marginLeft: 10,
                      marginRight: 10,
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
                  .onStatus((res) => {}, 200, 201, 203, 204)
                  .onFail(() => {})
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
  const dialogsRender = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 60,
            width: 240,
            backgroundColor: "white",
            border: "0px solid red",
            borderRadius: 5,
            zIndex: 100,
            boxShadow: "0 0 5px #cccccc",
            transition: "0.1s",
            height: 326,
            borderTopRightRadius: 16,
          }}
        >
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
                  style={{
                    width: 240,
                    height: 44,
                    boxShadow: "0 0 1px #cccccc",
                    color: "#005cff",
                    position: "relative",
                    zIndex: 101,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#2c3854",
                  }}
                  onClick={(e) => {
                    console.log(q)
                    if (q.id === dialog.id) {
                      setDialog({})
                      setChatOpened(false)
                      e.target.style.backgroundColor = "#ffffff"
                    } else {
                      setChatOpened(true)
                      setDialog(q)
                      getMessages(q.id)
                      e.target.style.backgroundColor = "#ccdeff"
                    }
                  }}
                >
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
      ></div>
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
