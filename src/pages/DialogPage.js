import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Input, Button } from "semantic-ui-react"
import { dialoguesApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"

let socket = undefined
const msgs = []

const DialogPage = (props) => {
  const href = window.location.href.split("/")
  const query = href[href.length - 1].split("?")
  const idBody = query[query.length - 1].split("=")
  let id = undefined
  if (idBody.length > 1) {
    id = idBody[1]
  }
  const profile = useSelector((state) => state.profile)
  const uuid = useSelector((state) => state.profile.elementProfile.user_id)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const getMessages = () => {
    apiGet(dialoguesApi + id + "/messages", {
      dialog_id: id,
    })
      .onStatus((res) => {
        res.data.results
          .slice(0)
          .reverse()
          .map((q) => {
            msgs.push(q)
          })
        setMessages(msgs.map((q) => q))
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  if (uuid && !socket) {
    const temp = uuid.replaceAll("-", "")
    socket = new WebSocket(
      "wss://api.nuntius.nalkuatov.kz/ws/dialogue/" + temp + "/",
    )
    socket.onopen = (event) => {}
    socket.onmessage = (event) => {
      console.log(event)
      const m = JSON.parse(JSON.parse(event.data).dialogue).top_message
      msgs.push(m)
      setMessages(msgs.map((q) => q))
    }
    socket.onclose = (event) => {}
  }
  useEffect(() => {
    getMessages()
  }, [])
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            margin: 70,
            marginTop: 100,
            border: "0px solid red",
            borderRadius: 15,
            boxShadow: "0 0 10px #aaaaaa",
            marginRight: 100,
          }}
        >
          <div
            style={{
              backgroundColor: "#005cff",
              border: "0px solid red",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              display: "flex",
              padding: 20,
              justifyContent: "start",
              alignItems: "center",
              color: "white",
              fontSize: 20,
            }}
          >
            {
              //dialog.user
            }
          </div>
          {msgs.map((q) => {
            return (
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
                      width: "max-content",
                      boxShadow: " 0 0 4px #aaaaaa",
                      margin: 10,
                      border: "0px solid red",
                      borderRadius: 15,
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    <div
                      style={{
                        width: "max-content",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          marginLeft: 15,
                          marginRight: 15,
                        }}
                      >
                        {q.from_user.email}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        paddingLeft: 40,
                        marginRight: 10,
                      }}
                    >
                      {q.text}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        paddingLeft: 50,
                      }}
                    >
                      <p style={{ marginRight: 14 }}>{q.created_at}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
          <div style={{ padding: 20, boxShadow: "0 0 4px #aaaaaa" }}>
            <div>
              <Input
                fluid
                value={text}
                onChange={(e, d) => {
                  setText(d.value)
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Button
                style={{ backgroundColor: "#005cff", color: "white" }}
                content={
                  <>
                    <div style={{ color: "white" }}>{"Отправить"}</div>
                  </>
                }
                onClick={() => {
                  apiPost(dialoguesApi + id + "/messages/", {
                    text,
                  })
                    .onStatus((res) => {}, 200, 201, 203, 204)
                    .onFail(() => {})
                    .afterAll(() => {})
                    .startSingle()
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DialogPage
