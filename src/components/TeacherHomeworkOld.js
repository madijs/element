import React, { useState, useEffect } from "react"
import {
  Card,
  Input,
  Button,
  Icon,
  Table,
  Dropdown,
  Modal,
  TextArea,
} from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"
import { apiGet } from "../utils/apiConnector"
import { groupsApi, homeworksApi, coursesApi } from "../config/apiUrls"

const TeacherHomework = () => {
  const [modal, setModal] = useState(false)
  const [inputs, setInputs] = useState(false)
  const [pageState, setPageState] = useState(0)
  const [allGroups, setAllGroups] = useState([])
  const [courses, setCourses] = useState([])
  const [groups, setGroups] = useState([])
  const [topics, setTopics] = useState([])
  const [group, setGroup] = useState({})
  const [course, setCourse] = useState({})
  const [topic, setTopic] = useState({})
  const [homeworks, setHomeworks] = useState([])
  const [homework, setHomework] = useState([])
  const [openAnswers, setOpenAnswers] = useState([])
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const getGroups = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type), {})
      .onStatus((res) => {
        const cses = []
        const grps = res.data.results
        grps.map((q) => {
          let having = false
          cses.map((w) => {
            if (q.course.id === w.id) having = true
          })
          if (having) return
          cses.push(q.course)
        })
        setCourses(cses)
        if (cses.length > 0) {
          setGroups(grps.filter((t) => t.course.id === cses[0].id))
          setCourse(cses[0])
          getTopics(cses[0].id)
        }
        setAllGroups(grps)
        if (grps.length > 0) setGroup(grps[0])
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getTopics = (id) => {
    apiGet(coursesApi + id, {})
      .onStatus((res) => {
        const tpcs = res.data.topics
        setTopics(tpcs)
        if (tpcs.length > 0) {
          setTopic(tpcs[0])
        }
        getHomeworks(id)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getHomeworks = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    const req = {}
    // if (group.id) req.group_id = group.id
    req.lesson_id = id
    apiGet(homeworksApi(type), req)
      .onStatus((res) => {
        console.log(res.data.results)
        setHomeworks(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getHomework = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type) + id + "/", {})
      .onStatus((res) => {
        console.log(res.data)
        setHomework(res.data)
        setOpenAnswers(res.data.open_answers.map((q) => 0))
        setModal(true)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getGroups()
    return () => {}
  }, [])
  const renderModal = () => {
    return (
      <>
        <Modal
          open={modal}
          size="large"
          style={{ marginTop: "-40vh" }}
          onClose={() => setModal(false)}
        >
          <Card fluid style={{ marginBottom: 100 }}>
            <Card.Content>
              <div style={{ padding: 40 }}>
                <div>
                  <div
                    style={{ fontSize: 24, fontWeight: 600, color: "#2c3854" }}
                  >
                    {pageState === 0 || pageState === 1
                      ? "Ответы ученика"
                      : pageState === 2
                      ? "Загруженный файл"
                      : ""}
                  </div>
                  <div style={{ display: "flex", marginTop: 8 }}>
                    <div
                      style={{
                        padding: 20,
                        height: 56,
                        borderRadius: 8,
                        border:
                          pageState === 0
                            ? "2px solid #005cff"
                            : "2px solid #c2cfe0",
                        color: pageState === 0 ? "#ffffff" : "#c2cfe0",
                        backgroundColor:
                          pageState === 0 ? "#005cff" : "#f9f9f9",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      onClick={() => {
                        setPageState(0)
                      }}
                    >
                      Тест
                    </div>
                    <div
                      style={{
                        padding: 20,
                        height: 56,
                        borderRadius: 8,
                        border:
                          pageState === 1
                            ? "2px solid #005cff"
                            : "2px solid #c2cfe0",
                        color: pageState === 1 ? "#ffffff" : "#c2cfe0",
                        backgroundColor:
                          pageState === 1 ? "#005cff" : "#f9f9f9",
                        marginLeft: 20,
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      onClick={() => {
                        setPageState(1)
                      }}
                    >
                      Открытые вопросы
                    </div>
                    <div
                      style={{
                        padding: 20,
                        height: 56,
                        borderRadius: 8,
                        border:
                          pageState === 2
                            ? "2px solid #005cff"
                            : "2px solid #c2cfe0",
                        color: pageState === 2 ? "#ffffff" : "#c2cfe0",
                        backgroundColor:
                          pageState === 2 ? "#005cff" : "#f9f9f9",
                        marginLeft: 20,
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      onClick={() => {
                        setPageState(2)
                      }}
                    >
                      Загруженный файл
                    </div>
                  </div>
                  <div
                    style={{
                      display:
                        pageState === 0 || pageState === 1 ? "block" : "none",
                    }}
                  >
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
                          ? homework.answers
                            ? homework.answers.map((q, i) => (
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
                                        {
                                          //q.option.text
                                        }
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
                                          name={
                                            q.is_correct ? "check" : "close"
                                          }
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
                          ? homework.open_answers
                            ? homework.open_answers.map((q, i) => (
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
                  </div>
                  <div
                    style={{
                      display: pageState === 2 ? "block" : "none",
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    <TextArea
                      style={{
                        height: 400,
                        fontWeight: 500,
                        fontSize: 16,
                        width: "100%",
                        backgroundColor: "#f5f6f8",
                        border: "1px solid #c2cfe0",
                        borderRadius: 16,
                        padding: 10,
                      }}
                      value={
                        homework.task_solutions
                          ? homework.task_solutions.length > 0
                            ? homework.task_solutions[0].task.text
                            : ""
                          : ""
                      }
                    />
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#2c3854",
                        marginTop: 56,
                      }}
                    >
                      {"Оценка работы"}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Input
                        type="number"
                        style={{
                          width: 66,
                          height: 32,
                        }}
                      />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#c2cfe0",
                        }}
                      >
                        /20
                      </span>
                      <Button
                        style={{
                          marginLeft: 10,
                          width: 66,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: "#00aaf4",
                          color: "#ffffff",
                        }}
                        onClick={() => {}}
                        content="OK"
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#2c3854",
                      }}
                    >
                      Комментарий к работе
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <TextArea
                        style={{
                          height: 84,
                          borderRadius: 16,
                          backgroundColor: "#f5f6f8",
                          border: "1px solid #c2cfe0",
                          width: "100%",
                          padding: 10,
                        }}
                        value={
                          homework.task_solutions
                            ? homework.task_solutions.length > 0
                              ? homework.task_solutions[0].teachers_comment
                              : ""
                            : ""
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 40,
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
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <Button
                      content="Готово"
                      style={{
                        backgroundColor: "#00aaf4",
                        color: "#ffffff",
                        boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                        borderRadius: 8,
                        height: 56,
                        width: 176,
                        fontSize: 16,
                        fontWeight: 600,
                        display:
                          pageState === 0 || pageState === 2 ? "none" : "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Modal>
      </>
    )
  }
  return (
    <>
      {renderModal()}
      <div style={{ marginLeft: 80, marginRight: 80, marginTop: 110 }}>
        <div>
          <Input
            fluid
            iconPosition="left"
            style={{
              paddingLeft: 10,
            }}
            labelPosition="right"
            onChange={(e, d) => {
              if (d.value) setInputs(true)
              else setInputs(false)
            }}
          >
            <Icon name="search" size="large" />
            <input
              placeholder={"Поиск по курсу или ученику"}
              style={{
                height: 56,
                border: "0px solid red",
                borderRadius: 16,
                paddingLeft: 10,
                boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.15)",
                fontWeight: 600,
                fontSize: 16,
              }}
            />
            <div
              style={{
                width: 134,
                backgroundColor: inputs ? "#00aaf4" : "#c7d3e3",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Поиск
            </div>
          </Input>
        </div>
        <div style={{ marginTop: 40 }}>
          <p style={{ fontSize: 24, fontWeight: 600, color: "#005cff" }}>
            Домашние задания
          </p>
        </div>
        <div
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: "#f5e2e4",
            height: 56,
            borderRadius: 8,
            display: "none",
            color: "#black",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <div style={{ color: "#f22e2e", fontSize: 16, fontWeight: 600 }}>
            Проверить до конца!
          </div>
          <div
            style={{
              marginLeft: 50,
              fontSize: 16,
              fontWeight: 600,
              color: "#2c3854",
            }}
          >
            Линейная алгебра. Группа 12
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
          }}
        >
          <div
            style={{
              padding: 20,
              height: 56,
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              fontSize: 16,
              fontWeight: 600,
              color: "#2c3854",
            }}
          >
            <Dropdown
              value={course.id}
              options={courses.map((q) => {
                const op = { key: q.id, text: q.title, value: q.id }
                return op
              })}
              onChange={(e, d) => {
                courses.map((q) => {
                  if (q.id === d.value) {
                    setCourse(q)
                    setGroups(allGroups.filter((w) => w.course.id === d.value))
                    allGroups.map((w) => {
                      if (w.course.id === d.value) {
                        setGroup(w)
                      }
                    })
                    getTopics(q.id)
                  }
                })
              }}
            />
          </div>
          <div
            style={{
              padding: 20,
              marginLeft: 20,
              height: 56,
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              fontSize: 16,
              fontWeight: 600,
              color: "#2c3854",
            }}
          >
            <Dropdown
              value={group.id}
              options={groups.map((q) => {
                const op = { key: q.id, text: "Группа " + q.title, value: q.id }
                return op
              })}
              onChange={(e, d) => {
                groups.map((q) => {
                  if (q.id === d.value) setGroup(q)
                })
                getHomeworks(topic.id)
              }}
            />
          </div>
          <div
            style={{
              padding: 20,
              marginLeft: 20,
              height: 56,
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              fontSize: 16,
              fontWeight: 600,
              color: "#2c3854",
            }}
          >
            <Dropdown
              value={topic.id}
              options={topics.map((q) => {
                const op = { key: q.id, text: q.title, value: q.id }
                return op
              })}
              onChange={(e, d) => {
                topics.map((q) => {
                  if (q.id === d.value) setTopic(q)
                })
                getHomeworks(d.value)
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table style={{ border: "0px solid red" }}>
            <Table.Header style={{ border: "0px solid red" }}>
              <Table.Row style={{ border: "0px solid red", height: 56 }}>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    border: "0px solid red",
                    borderTopLeftRadius: 16,
                  }}
                >
                  Фамилия имя ученика
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    border: "0px solid red",
                  }}
                >
                  Дата прохождения
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    border: "0px solid red",
                  }}
                >
                  Работы студентов
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    borderTopRightRadius: 16,
                    border: "0px solid red",
                  }}
                >
                  Результат
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {homeworks.map((q) => (
                <>
                  <Table.Row
                    style={{ height: 52 }}
                    onClick={() => {
                      getHomework(q.id)
                    }}
                  >
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {(q.student.user.last_name !== "not_giiven"
                        ? q.student.user.last_name
                        : "") +
                        " " +
                        (q.student.user.first_name !== "not_giiven"
                          ? q.student.user.first_name
                          : "")}
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {q.student.created_at
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
                          return q + " "
                        })
                        .reverse()}
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      Открыть работу
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {q.points}/100
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div style={{ height: 100 }}></div>
      </div>
    </>
  )
}

export default TeacherHomework
