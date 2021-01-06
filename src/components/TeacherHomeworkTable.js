import React, { useState, useEffect } from "react"
import { Table, Icon, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { apiPut } from "../utils/apiConnector"
import { studentWorksApi } from "../config/apiUrls"

const TeacherHomeworkTable = (props) => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [comment, setComment] = useState("")
  const { pageState, homework, openAnswers, setOpenAnswers, setModal } = props
  return (
    <>
      <div>
        <Table
          fluid
          style={{
            border: "0px solid red",
            boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <Table.Header>
            <Table.Row style={{ height: 56 }}>
              <Table.Cell
                style={{
                  backgroundColor: "#d9f4ff",
                  borderTopLeftRadius: 16,
                  color: "#00aaf4",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  №
                </div>
              </Table.Cell>
              <Table.Cell
                style={{
                  backgroundColor: "#d9f4ff",
                  color: "#00aaf4",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Вопрос
              </Table.Cell>
              <Table.Cell
                style={{
                  backgroundColor: "#d9f4ff",
                  color: "#00aaf4",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Ответы ученика
              </Table.Cell>
              <Table.Cell
                style={{
                  backgroundColor: "#d9f4ff",
                  borderTopRightRadius: 16,
                  color: "#00aaf4",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Правильность
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageState === 0
              ? homework.studentworks[0].answers
                ? homework.studentworks[0].answers.map((q, i) => (
                    <>
                      <Table.Row>
                        <Table.Cell>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.id}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.question.title}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.options.map((q) => (
                              <span
                                style={{
                                  marginLeft: 4,
                                  display: "inline-block",
                                }}
                              >
                                {q.text}
                              </span>
                            ))}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            <Icon
                              name={q.is_correct ? "check" : "close"}
                              color={q.is_correct ? "green" : "red"}
                              size="big"
                            />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))
                : ""
              : ""}
            {pageState === 1
              ? homework.studentworks[0].open_answers
                ? homework.studentworks[0].open_answers.map((q, i) => (
                    <>
                      <Table.Row>
                        <Table.Cell>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.id}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.question.title}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {q.text}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#334d6e",
                              marginTop: 10,
                              marginBottom: 30,
                            }}
                          >
                            {openAnswers[i] === 0 ? (
                              <>
                                <Icon
                                  name="check"
                                  color="green"
                                  size="large"
                                  onClick={() => {
                                    setOpenAnswers(
                                      openAnswers.map((t, j) => {
                                        if (j === i) {
                                          return 2
                                        }
                                        return t
                                      }),
                                    )
                                  }}
                                />
                                <Icon
                                  name="close"
                                  color="red"
                                  size="large"
                                  onClick={() => {
                                    setOpenAnswers(
                                      openAnswers.map((t, j) => {
                                        if (j === i) {
                                          return 1
                                        }
                                        return t
                                      }),
                                    )
                                  }}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                            {openAnswers[i] === 1 ? (
                              <>
                                <Icon
                                  name="close"
                                  color="red"
                                  size="big"
                                  // onClick={() => {}}
                                  onClick={() => {
                                    setOpenAnswers(
                                      openAnswers.map((t, j) => {
                                        if (j === i) {
                                          return 0
                                        }
                                        return t
                                      }),
                                    )
                                  }}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                            {openAnswers[i] === 2 ? (
                              <>
                                <Icon
                                  name="check"
                                  color="green"
                                  size="big"
                                  // onClick={() => {}}
                                  onClick={() => {
                                    setOpenAnswers(
                                      openAnswers.map((t, j) => {
                                        if (j === i) {
                                          return 0
                                        }
                                        return t
                                      }),
                                    )
                                  }}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))
                : ""
              : ""}
          </Table.Body>
        </Table>
        {pageState === 1 && (
          <>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  width: 362,
                  height: 56,
                  backgroundColor: "#005cff",
                  borderRadius: 16,
                  color: "white",
                  fontWeight: 600,
                  fontSize: 16,
                }}
                content={"Сохранить изменения и закрыть"}
                onClick={() => {
                  const req = {}
                  let p = 0
                  openAnswers.map((q) => {
                    if (q === 2) {
                      p += 1
                    }
                  })
                  req.points = p
                  req.teachers_comment = comment
                  const type = profile.elementProfile
                    ? profile.elementProfile.type
                    : -1
                  if (type === -1) return
                  apiPut(
                    studentWorksApi(
                      type,
                      "open-question-answers/",
                      homework.studentworks[0].task_solutions[0].id,
                    ),
                    req,
                  )
                    .onStatus(
                      (req) => {
                        console.log(req)
                      },
                      200,
                      201,
                      202,
                      203,
                      204,
                      400,
                    )
                    .onFail(() => {})
                    .afterAll(() => {
                      setModal(false)
                    })
                    .startSingle()
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default TeacherHomeworkTable
