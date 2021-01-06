import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apiGet, apiPost, apiPut, apiPatch } from "../utils/apiConnector"
import { Card, Radio, Input, Button } from "semantic-ui-react"
import { topicsApi, homeworksApi, studentWorksApi } from "../config/apiUrls"
import { useHistory } from "react-router-dom"

let testId

const OpenQuestionsPage = () => {
  const history = useHistory()
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState({ index: -1 })
  const [answer, setAnswer] = useState({})
  const [hwInfo, setHwInfo] = useState({})
  const [done, setDone] = useState(0)
  const [notDone, setNotDone] = useState(0)
  const getHwInfo = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type) + testId + "/", {})
      .onStatus((rs) => {
        console.log(rs.data)
        const id = rs.data.topic.id
        setHwInfo(rs.data)
        apiGet(topicsApi + id + "/open-questions/", {})
          .onStatus((res) => {
            console.log(res.data)
            if (res.data.length) {
              const qu = res.data[0]
              qu.answer = ""
              qu.index = 0
              setQuestion(qu)
            }
            setQuestions(
              res.data.map((q) => {
                q.answer = ""
                return q
              }),
            )
          }, 200)
          .onFail(() => {})
          .afterAll(() => {})
          .startSingle()
      }, 200)
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
            <p
              style={{
                color: "#2c3854",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {question.title}
            </p>
            {questions.length ? (
              <>
                Ответ:{" "}
                <Input
                  onChange={(e, d) => {
                    setQuestions(
                      questions.map((q, i) => {
                        if (i === question.index) {
                          q.answer = d.value
                        }
                        return q
                      }),
                    )
                  }}
                  value={
                    questions
                      ? questions.length
                        ? questions[question.index].answer
                          ? questions[question.index].answer
                          : ""
                        : ""
                      : ""
                  }
                />
              </>
            ) : (
              <></>
            )}
            <div
              style={{
                display: "flex",
                marginTop: 40,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: question.index === 0 ? "#c7d3e3" : "#00aaf4",
                  fontWeight: 600,
                  lineHeight: "13px",
                }}
                onClick={() => {
                  if (question.index === 0) return
                  const y = questions[question.index - 1]
                  y.index = question.index - 1
                  setQuestion(y)
                }}
              >
                Предыдущий вопрос
              </div>
              <div
                style={{
                  fontSize: 16,
                  color:
                    question.index === questions.length - 1
                      ? "#c7d3e3"
                      : "#00aaf4",
                  fontWeight: 600,
                  lineHeight: "13px",
                }}
                onClick={() => {
                  if (question.index === questions.length - 1) return
                  const y = questions[question.index + 1]
                  y.index = question.index + 1
                  setQuestion(y)
                }}
              >
                Следующий вопрос
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 40 }}>
              {questions.map((q, i) => (
                <>
                  <div
                    style={{
                      height: 33,
                      width: 42,
                      borderRadius: 8,
                      backgroundColor:
                        q.answer === "" || question.index === i
                          ? "#f5f6f8"
                          : "#00aaf4",
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: question.index === i ? "#00aaf4" : "#c7d3e3",
                      border:
                        question.index === i
                          ? "2px solid #00aaf4"
                          : "0px solid red",
                    }}
                    onClick={() => {
                      const y = q
                      q.index = i
                      setQuestion(y)
                    }}
                  >
                    {q.answer === "" || question.index === i ? (
                      i + 1
                    ) : (
                      <img src="./assets/img/hw_test/chevron.png" />
                    )}
                  </div>
                </>
              ))}
            </div>
            <div style={{ display: questions.length ? "block" : "none" }}>
              <Button
                style={{
                  marginTop: 20,
                  backgroundColor: "#00aaf4",
                  color: "#ffffff",
                }}
                content="Завершить"
                disabled={questions.filter((q) => q.answer === "").length}
                onClick={() => {
                  if (profile.elementProfile) {
                    if (profile.elementProfile.type === 0) {
                      const type = profile.elementProfile.type
                      questions.map((q) => {
                        if (q.answer === "") return
                        setNotDone(notDone + 1)
                        apiPut(
                          studentWorksApi(
                            type,
                            "open-question-answers",
                            testId,
                          ),
                          {
                            text: q.answer,
                          },
                        )
                          .onStatus(
                            (res) => {
                              console.log(res)
                            },
                            200,
                            400,
                          )
                          .onFail(() => {})
                          .afterAll(() => {
                            setDone(done + 1)
                          })
                          .startSingle()
                      })
                      if (notDone === done) {
                        history.push("/home-works/")
                      }
                    }
                  }
                }}
              />
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  )
}

export default OpenQuestionsPage
