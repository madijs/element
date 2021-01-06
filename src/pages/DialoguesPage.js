import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getDialogues } from "../ducks/dialogues"
import { createChat } from "../ducks/chats"
import { Modal, Card, Input, Button } from "semantic-ui-react"

const DialoguesPage = () => {
  const dialogues = useSelector((state) => state.dialogues)
  const chats = useSelector((state) => state.chats)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const onGetDialogues = () => {
    dispatch(getDialogues())
  }
  const onCreateChat = () => {
    dispatch(createChat(callback, title))
  }
  const callback = () => {
    setIsLoading(false)
  }
  const renderModal = () => {
    return (
      <>
        <Modal
          open={modal}
          onClose={() => {
            setModal(false)
            setTitle("")
          }}
        >
          <Card fluid>
            <Card.Content>
              <div>
                <Input
                  placeholder={"Имя чата"}
                  value={title}
                  onChange={(e, d) => {
                    setTitle(d.value)
                  }}
                />
                <Button content={"Создать"} onClick={onCreateChat} />
              </div>
            </Card.Content>
          </Card>
        </Modal>
      </>
    )
  }
  useEffect(() => {
    onGetDialogues()
    return () => {}
  }, [])
  console.log(dialogues.data)
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
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              fontSize: 20,
              padding: 20,
            }}
          >
            <div>Диалоги</div>
            <div style={{ cursor: "pointer" }} onClick={() => {}}>
              Создать чат
            </div>
          </div>
          {dialogues.data.map((q) => {
            return (
              <>
                <div
                  style={{
                    maxHeight: 100,
                    boxShadow: "0 0 2px #cccccc",
                    color: "#005cff",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/dialog?id=" + q.id)
                  }}
                >
                  <div
                    style={{
                      width: "max-content",
                    }}
                  >
                    <p
                      style={{ fontSize: 14, marginLeft: 15, marginRight: 15 }}
                    >
                      {
                        q.top_message.from_user.email
                      }
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      paddingLeft: 40,
                      marginRight: 10,
                      width: "80%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <p>
                      {
                        JSON.stringify(q.top_message.text)
                      }
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <p style={{ marginRight: 14 }}>
                      {
                        q.top_message.updated_at
                      }
                    </p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default DialoguesPage
