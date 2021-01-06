import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  Input,
  Button,
  Checkbox,
  Radio,
  Table,
  Card,
  Tab,
} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { apiGet, apiPost } from "../utils/apiConnector"
import { homeworksApi } from "../config/apiUrls"
import ResultComponent from "../components/ResultComponent"

const StudentHomework = () => {
  const [pageState, setPageState] = useState(0)
  const [resType, setResType] = useState(0)
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [homeworks, setHomeworks] = useState([])
  const [inners, setInners] = useState([])
  const [modal, setModal] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [all, setAll] = useState(0)
  const history = useHistory()
  const getHomeworks = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type), {})
      .onStatus((res) => {
        console.log(res.data.results)
        res.data.results.map((q) => {
          console.log(q.lesson)
        })
        setHomeworks(res.data.results)
        setInners(res.data.results.map((q) => ({ closed: true })))
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getHomework = (id, rt) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type) + id, {})
      .onStatus((res) => {
        console.log(res.data.studentworks[0])
        let c = 0
        let a = 0
        if (rt === 1) {
          res.data.studentworks[0].answers.map((q) => {
            q.options.map((w) => {
              if (w.is_correct) {
                c += 1
              }
              a += 1
            })
            if (!q.options.length) {
              a += 1
            }
          })
        } else if (rt === 2) {
          res.data.studentworks[0].open_answers.map((q) => {
            if (q.points) {
              c += 1
            }
            a += 1
          })
        } else if (rt === 3) {
          res.data.studentworks[0].task_solutions.map((q) => {
            if (q.points) {
              c += 1
            }
            a += 1
          })
        }
        console.log(rt)
        console.log(c)
        console.log(a)
        setAll(a)
        setCorrect(c)
        setResType(rt)
        setModal(true)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getHomeworks()
    return () => {}
  }, 200)
  return (
    <>
      <ResultComponent
        modal={modal}
        correct={correct}
        all={all}
        setModal={setModal}
        resType={resType}
      />
      <div>
        <div style={{ marginLeft: 80, marginTop: 90 }}>
          <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
            Домашние задания
          </p>
          <div style={{ marginTop: 20, display: "flex" }}>
            <div style={{}}>
              <p
                style={{
                  color: pageState === 0 ? "#2c3854" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 1,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setPageState(0)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
              >
                Все задания
              </p>
              <div
                style={{
                  border:
                    (pageState === 0 ? "1" : "0") +
                    "px solid" +
                    (pageState === 0 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
            <div>
              <p
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  color: pageState === 1 ? "#2c3854" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 1,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setPageState(1)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
              >
                Невыполненные задания
              </p>
              <div
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  border:
                    (pageState === 1 ? "1" : "0") +
                    "px solid" +
                    (pageState === 1 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
            <div>
              <p
                style={{
                  color: pageState === 2 ? "#2c3854" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 1,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setPageState(2)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
              >
                Выполненные задания
              </p>
              <div
                style={{
                  border:
                    (pageState === 2 ? "1" : "0") +
                    "px solid" +
                    (pageState === 2 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              width: 1000,
              display: "none",
              border: "1px solid #c2cfe0",
            }}
          ></div>
          <div style={{ marginTop: 45, marginRight: 80 }}>
            <Table style={{ width: "100%", border: "0px solid red" }}>
              <Table.Header style={{ border: "0px solid red" }}>
                <Table.Row
                  style={{
                    height: 55,
                    border: "0px solid red",
                  }}
                >
                  <Table.HeaderCell
                    style={{
                      width: "20%",
                      backgroundColor: "#d9f4ff",
                      border: "0px solid red",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#00aaf4",
                      borderTopLeftRadius: 8,
                    }}
                  >
                    Предмет
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      width: "60%",
                      backgroundColor: "#d9f4ff",
                      border: "0px solid red",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#00aaf4",
                    }}
                  >
                    Тема урока
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      width: "20%",
                      backgroundColor: "#d9f4ff",
                      border: "0px solid red",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#00aaf4",
                      borderTopRightRadius: 8,
                    }}
                  >
                    Дедлайн
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body style={{ border: "0px solid red" }}>
                {homeworks.map((q, i) => {
                  let over = false
                  if (q.ends_at) {
                    const ends_at = new Date(q.ends_at)
                    const today = new Date()
                    if (ends_at.getFullYear() < today.getFullYear()) {
                      over = true
                    } else if (
                      ends_at.getFullYear() === today.getFullYear() &&
                      ends_at.getMonth() < today.getMonth()
                    ) {
                      over = true
                    } else if (
                      ends_at.getFullYear() === today.getFullYear() &&
                      ends_at.getMonth() === today.getMonth() &&
                      ends_at.getDate() < today.getDate()
                    ) {
                      over = true
                    }
                  }
                  if (pageState === 1) {
                    if (
                      q.studentworks.length ? q.studentworks[0].is_done : ""
                    ) {
                      return <></>
                    }
                  } else if (pageState === 2) {
                    if (
                      q.studentworks.length ? !q.studentworks[0].is_done : ""
                    ) {
                      return <></>
                    }
                  }
                  return (
                    <>
                      <Table.Row
                        style={{
                          border: "0px solid red",
                          backgroundColor: "#f9f9f9",
                          marginTop: 12,
                        }}
                        onClick={() => {
                          setInners(
                            inners.map((w, y) => {
                              if (y === i) w.closed = !w.closed
                              return w
                            }),
                          )
                        }}
                      >
                        <Table.Cell
                          style={{ padding: 0, border: "0px solid red" }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "space-between",
                              paddingLeft: 14,
                              alignItems: "center",
                              borderRadius: 10,
                              marginRight: 20,
                              marginTop: 12,
                              fontWeight: 600,
                              border: "0px solid red",
                              color: "#2c3854",
                            }}
                          >
                            {q.group.course.title}
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{ padding: 0, border: "0px solid red" }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "space-between",
                              paddingLeft: 14,
                              paddingRight: 14,
                              alignItems: "center",
                              borderRadius: 10,
                              marginRight: 20,
                              marginTop: 12,
                              fontWeight: 600,
                            }}
                          >
                            <div style={{ color: "#2c3854" }}>
                              {q.lesson.title}
                            </div>
                            <div>
                              <img
                                src={
                                  "./assets/img/hw/chevron_" +
                                  (inners.length > 0
                                    ? (inners[i].closed ? "right" : "down") +
                                      ".png"
                                    : ".png")
                                }
                              />
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{ padding: 0, border: "0px solid red" }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 14,
                              alignItems: "center",
                              borderRadius: 10,
                              marginTop: 12,
                              fontWeight: 600,
                            }}
                          >
                            {q.ends_at ? (
                              <img
                                src={
                                  "./assets/img/hw/" +
                                  (over ? "warning" : "calendar") +
                                  ".png"
                                }
                                style={{ marginRight: 10 }}
                              />
                            ) : (
                              ""
                            )}
                            <div style={{ color: "#2c3854" }}>
                              {q.ends_at ? (
                                q.ends_at
                                  .split("-")
                                  .map((q, i) => {
                                    if (i === 2) {
                                      return q.slice(0, 2) + " "
                                    } else if (i === 1) {
                                      return (
                                        [
                                          "",
                                          "январь",
                                          "февраль",
                                          "март",
                                          "апрель",
                                          "май",
                                          "июнь",
                                          "июль",
                                          "август",
                                          "сентябрь",
                                          "октябрь",
                                          "ноябрь",
                                          "декабрь",
                                        ][parseInt(q)] + " "
                                      )
                                    }
                                    return q + " г"
                                  })
                                  .reverse()
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row
                        style={{
                          border: "0px solid red",
                          marginTop: 20,
                          display: (
                            inners.length
                              ? inners.filter((w, t) => t === i)[0].closed
                              : true
                          )
                            ? "none"
                            : "",
                        }}
                      >
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        ></Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img src="./assets/img/hw/line59.png" />
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 30,
                              alignItems: "center",
                              borderRadius: 10,
                              fontWeight: 600,
                              width: "90%",
                              lineHeight: "19,5px",
                            }}
                            onClick={() => {
                              if (
                                q.studentworks.length
                                  ? q.studentworks[0].questions_status
                                      .done_answers_number ===
                                      q.studentworks[0].questions_status
                                        .possible_answers_number || over
                                  : false
                              ) {
                                getHomework(q.id, 1)
                              } else {
                                history.push("/test/" + q.id)
                              }
                            }}
                          >
                            {q.studentworks.length ? (
                              !q.studentworks[0].is_active ||
                              q.studentworks[0].questions_status
                                .done_answers_number ===
                                q.studentworks[0].questions_status
                                  .possible_answers_number ? (
                                <img
                                  src={
                                    "./assets/img/hw/" +
                                    (q.studentworks[0].questions_status
                                      .done_answers_number ===
                                    q.studentworks[0].questions_status
                                      .possible_answers_number
                                      ? "check_blue"
                                      : "x_red") +
                                    ".png"
                                  }
                                />
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                marginLeft: 10,
                                color: q.studentworks.length
                                  ? !q.studentworks[0].is_active
                                    ? q.studentworks[0].questions_status
                                        .done_answers_number ===
                                      q.studentworks[0].questions_status
                                        .possible_answers_number
                                      ? "#00aaf4"
                                      : "#f22e2e"
                                    : "#2c3854"
                                  : "#2c3854",
                              }}
                            >
                              Тест.
                            </div>
                            <div style={{ marginLeft: 10, color: "#2c3854" }}>
                              {q.topic.title}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 12,
                              alignItems: "center",
                              borderRadius: 10,
                              marginRight: 0,
                              fontWeight: 600,
                            }}
                          >
                            {q.studentworks.length ? (
                              q.studentworks[0].questions_status
                                .done_answers_number > 0 ? (
                                <>
                                  <div style={{ color: "#2c3854" }}>
                                    Cделано
                                  </div>
                                </>
                              ) : (
                                <div style={{ color: "#c2cfe0" }}>
                                  Не сделано
                                </div>
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row
                        style={{
                          border: "0px solid red",
                          marginTop: 20,
                          display: (
                            inners.length
                              ? inners.filter((w, t) => t === i)[0].closed
                              : true
                          )
                            ? "none"
                            : "",
                        }}
                      >
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        ></Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img src="./assets/img/hw/line59.png" />
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 30,
                              alignItems: "center",
                              borderRadius: 10,
                              fontWeight: 600,
                              width: "90%",
                            }}
                            onClick={() => {
                              if (
                                q.studentworks[0].open_questions_status
                                  .done_answers_number > 0 ||
                                over
                              ) {
                                getHomework(q.id, 2)
                              } else {
                                history.push("/open-questions/" + q.id)
                              }
                            }}
                          >
                            {q.studentworks.length ? (
                              !q.studentworks[0].is_active ||
                              q.studentworks[0].open_questions_status
                                .is_checked ? (
                                <img
                                  src={
                                    "./assets/img/hw/" +
                                    (q.studentworks[0].open_questions_status
                                      .is_checked
                                      ? "check_blue"
                                      : "x_red") +
                                    ".png"
                                  }
                                />
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                marginLeft: 10,
                                color: q.studentworks.length
                                  ? !q.studentworks[0].is_active
                                    ? q.studentworks[0].open_questions_status
                                        .is_checked
                                      ? "#00aaf4"
                                      : "#f22e2e"
                                    : "#2c3854"
                                  : "#2c3854",
                              }}
                            >
                              Открытые вопросы.
                            </div>
                            <div style={{ marginLeft: 10, color: "#2c3854" }}>
                              {q.topic.title}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 12,
                              alignItems: "center",
                              borderRadius: 10,
                              marginRight: 0,
                              fontWeight: 600,
                            }}
                          >
                            {q.studentworks.length ? (
                              q.studentworks[0].open_questions_status
                                .is_checked ? (
                                <div style={{ color: "#2c3854" }}>Оценено</div>
                              ) : (
                                <div style={{ color: "#c2cfe0" }}>
                                  Не{" "}
                                  {q.studentworks[0].open_questions_status
                                    .done_answers_number ===
                                  q.studentworks[0].open_questions_status
                                    .possible_answers_number
                                    ? "оценено"
                                    : "сделано"}
                                </div>
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row
                        style={{
                          border: "0px solid red",
                          marginTop: 20,
                          display: (
                            inners.length
                              ? inners.filter((w, t) => t === i)[0].closed
                              : true
                          )
                            ? "none"
                            : "",
                        }}
                      >
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        ></Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img src="./assets/img/hw/line59.png" />
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 30,
                              alignItems: "center",
                              borderRadius: 10,
                              fontWeight: 600,
                              width: "90%",
                            }}
                            onClick={() => {
                              if (
                                q.studentworks.length
                                  ? q.studentworks[0].solutions_status
                                      .done_answers_number > 0 || over
                                  : ""
                              ) {
                                getHomework(q.id, 3)
                              } else {
                                history.push("/upload-file/" + q.id)
                              }
                            }}
                          >
                            {q.studentworks.length ? (
                              !q.studentworks[0].is_active ||
                              q.studentworks[0].solutions_status.is_checked ? (
                                <img
                                  src={
                                    "./assets/img/hw/" +
                                    (q.studentworks[0].solutions_status
                                      .is_checked.is_checked
                                      ? "check_blue"
                                      : "x_red") +
                                    ".png"
                                  }
                                />
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                            <div
                              style={{
                                marginLeft: 10,
                                color: q.studentworks.length
                                  ? !q.studentworks[0].is_active
                                    ? q.studentworks[0].solutions_status
                                        .is_checked.is_checked
                                      ? "#00aaf4"
                                      : "#f22e2e"
                                    : "#2c3854"
                                  : "#2c3854",
                              }}
                            >
                              Загрузить файл
                            </div>
                            <div style={{ marginLeft: 10, color: "#2c3854" }}>
                              {q.topic.title}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            backgroundColor: "#f9f9f9",
                            border: "0px solid red",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              height: 56,
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: 12,
                              alignItems: "center",
                              borderRadius: 10,
                              marginRight: 0,
                              fontWeight: 600,
                            }}
                          >
                            {q.studentworks.length ? (
                              q.studentworks[0].solutions_status.is_checked ? (
                                <div style={{ color: "#2c3854" }}>Оценено</div>
                              ) : (
                                <div style={{ color: "#c2cfe0" }}>
                                  Не оценено
                                </div>
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentHomework
