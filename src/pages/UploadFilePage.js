import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apiGet, apiPut } from "../utils/apiConnector"
import { Card, Radio, Input, Button, TextArea } from "semantic-ui-react"
import { topicsApi, homeworksApi, studentWorksApi } from "../config/apiUrls"

let testId = ""

const UploadFilePage = () => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState(-1)
  const [hwInfo, setHwInfo] = useState({})
  const [text, setText] = useState("")
  const fileInput = useRef()
  const getHwInfo = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type) + testId + "/", {})
      .onStatus((rs) => {
        console.log(rs.data)
        const id = rs.data.topic.id
        setHwInfo(rs.data)
        apiGet(topicsApi + id + "/tasks/", {})
          .onStatus((res) => {
            console.log(res.data[0])
            if (res.data.length) setQuestion(res.data[0])
          }, 200)
          .onFail(() => {})
          .afterAll(() => {})
          .startSingle()
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const handleSubmit = () => {
    if (fileInput.current.files.length > 0) {
      console.log(fileInput.current)
    }
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    const fd = new FormData()
    if (fileInput.current.files.length > 0) {
      fd.append("file", fileInput.current.files[0])
    } else {
      fd.append("text", text)
    }
    apiPut(studentWorksApi(type, "tasks-solutions", question.id), fd)
      .onStatus(
        (res) => {
          console.log(res)
        },
        200,
        201,
        202,
        204,
        400,
      )
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    const href = window.location.href.split("/")
    if (href[5]) {
      testId = href[5]
    } else {
      testId = ""
    }
    if (testId) getHwInfo()
    return () => {}
  }, [])
  return (
    <>
      <div style={{ marginLeft: 80, marginRight: 80, marginTop: 110 }}>
        <Card
          fluid
          style={{ boxShadow: " 0px 4px 10px rgba(0, 71, 255, 0.1)" }}
        >
          <Card.Content
            style={{ padding: 40, paddingLeft: 80, paddingRight: 80 }}
          >
            <p style={{ fontWeight: 600, fontSize: 24, color: "#00aaf4" }}>
              Загрузить файл
            </p>
            <p
              style={{
                fontWeight: 500,
                fontSize: 16,
                color: "#2c3854",
                marginTop: 40,
              }}
            >
              {question.title}
            </p>
            <input type="file" style={{ marginTop: 20 }} ref={fileInput} />
            <div style={{ marginTop: 50 }}>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#2c3854",
                }}
              >
                ИЛИ можешь вставить свое эссе здесь
              </p>
              <TextArea
                style={{
                  backgroundColor: "#f5f6f8",
                  borderRadius: 16,
                  border: "0px solid red",
                  boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.15)",
                  height: 265,
                  width: "100%",
                }}
                value={text}
                onChange={(e, d) => {
                  setText(d.value)
                }}
              />
            </div>
            <Button
              content="Отправить"
              style={{
                marginTop: 20,
                width: 252,
                height: 56,
                borderRadius: 16,
                color: "#ffffff",
                backgroundColor: "#00aaf4",
              }}
              onClick={handleSubmit}
            />
          </Card.Content>
        </Card>
        <div style={{ height: 100 }}></div>
      </div>
    </>
  )
}

export default UploadFilePage
