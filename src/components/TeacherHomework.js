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
import {
  groupsApi,
  homeworksApi,
  coursesApi,
  lessonsApi,
  searchStudentWorksApi,
} from "../config/apiUrls"
import TeacherHomeworkTable from "./TeacherHomeworkTable"
import TeacherHomeworkUpload from "./TeacherHomeworkUpload"

const TeacherHomework = () => {
  const [modal, setModal] = useState(false)
  const [inputs, setInputs] = useState(false)
  const [pageState, setPageState] = useState(0)
  const [allGroups, setAllGroups] = useState([])
  const [courses, setCourses] = useState([])
  const [groups, setGroups] = useState([])
  const [lessons, setLessons] = useState([])
  const [lesson, setLesson] = useState({})
  const [group, setGroup] = useState({})
  const [course, setCourse] = useState({})
  const [homeworks, setHomeworks] = useState([])
  const [homework, setHomework] = useState([])
  const [searchedHomeworks, setSearchedHomeworks] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState(false)
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
          getLessons(grps[0].id)
        }
        setAllGroups(grps)
        if (grps.length > 0) setGroup(grps[0])
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getLessons = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(lessonsApi(type), { group_uuid: id })
      .onStatus((res) => {
        console.log(id)
        console.log(res.data.results)
        setLessons(res.data.results)
        if (res.data.results.length > 0) {
          setLesson(res.data.results[0])
          getHomeworks(res.data.results[0].id)
        }
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
  const getSearchedHomeworks = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(searchStudentWorksApi, { search: searchInput })
      .onStatus((res) => {
        setSearchedHomeworks(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const renderModal = () => {
    return (
      <>
        <Modal
          open={modal}
          size="large"
          style={{ marginTop: "-40vh", height: "max-content" }}
          onClose={() => setModal(false)}
        >
          <Card fluid style={{ paddingBottom: 100 }}>
            <Card.Content>
              <div style={{ padding: 40 }}>
                <div
                  style={{ fontSize: 24, fontWeight: 600, color: "#2c3854" }}
                >
                  {pageState === 0 || pageState === 1
                    ? "Ответы ученика"
                    : pageState === 2
                    ? "Загруженный файл"
                    : ""}
                </div>
                {pageState === 0 || pageState === 1 ? (
                  <>
                    <TeacherHomeworkTable
                      pageState={pageState}
                      homework={homework}
                      openAnswers={openAnswers}
                      setOpenAnswers={setOpenAnswers}
                      setModal={setModal}
                    />
                  </>
                ) : (
                  <>
                    <TeacherHomeworkUpload
                      pageState={pageState}
                      homework={homework}
                      setModal={setModal}
                    />
                  </>
                )}
              </div>
            </Card.Content>
          </Card>
        </Modal>
      </>
    )
  }
  const getHomework = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(homeworksApi(type) + id + "/", {})
      .onStatus((res) => {
        console.log(res.data)
        setHomework(res.data)
        setOpenAnswers(res.data.studentworks[0].open_answers.map((q) => 0))
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
              setSearchInput(d.value)
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
                cursor: "pointer",
              }}
              onClick={() => {
                getSearchedHomeworks()
                setSearch(true)
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1
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
        <div style={{ display: "flex", marginTop: 8 }}>
          <div
            style={{
              padding: 20,
              height: 56,
              borderRadius: 8,
              border:
                pageState === 0 ? "2px solid #005cff" : "2px solid #c2cfe0",
              color: pageState === 0 ? "#ffffff" : "#c2cfe0",
              backgroundColor: pageState === 0 ? "#005cff" : "#f9f9f9",
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageState(0)
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.7
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1
            }}
          >
            <img
              src={
                "./assets/img/hw/tests_" +
                (pageState === 0 ? "white" : "gray") +
                ".png"
              }
            />
            <div style={{ marginLeft: 12 }}>Тест</div>
          </div>
          <div
            style={{
              padding: 20,
              height: 56,
              borderRadius: 8,
              border:
                pageState === 1 ? "2px solid #005cff" : "2px solid #c2cfe0",
              color: pageState === 1 ? "#ffffff" : "#c2cfe0",
              backgroundColor: pageState === 1 ? "#005cff" : "#f9f9f9",
              marginLeft: 20,
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageState(1)
            }}
            onMouseOver={(e) => {
              e.target.style.opacity = 0.7
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = 1
            }}
          >
            <img
              src={
                "./assets/img/hw/questions_" +
                (pageState === 1 ? "white" : "gray") +
                ".png"
              }
            />
            <div style={{ marginLeft: 12 }}>Открытые вопросы</div>
          </div>
          <div
            style={{
              padding: 20,
              height: 56,
              borderRadius: 8,
              border:
                pageState === 2 ? "2px solid #005cff" : "2px solid #c2cfe0",
              color: pageState === 2 ? "#ffffff" : "#c2cfe0",
              backgroundColor: pageState === 2 ? "#005cff" : "#f9f9f9",
              marginLeft: 20,
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageState(2)
            }}
            onMouseOver={(e) => {
              e.target.style.opacity = 0.7
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = 1
            }}
          >
            <img
              src={
                "./assets/img/hw/downloads_" +
                (pageState === 2 ? "white" : "gray") +
                ".png"
              }
            />
            <div style={{ marginLeft: 12 }}>Загруженный файл</div>
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
                setSearch(false)
                courses.map((q) => {
                  if (q.id === d.value) {
                    setCourse(q)
                    setGroups(allGroups.filter((w) => w.course.id === d.value))
                    allGroups.map((w) => {
                      if (w.course.id === d.value) {
                        console.log(w)
                        setGroup(w)
                        getLessons(w.id)
                      }
                    })
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
                setSearch(false)
                groups.map((q) => {
                  if (q.id === d.value) setGroup(q)
                })
                getLessons(d.value)
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
              value={lesson.id}
              options={lessons.map((q) => {
                const op = { key: q.id, text: q.title, value: q.id }
                return op
              })}
              onChange={(e, d) => {
                setSearch(false)
                lessons.map((q) => {
                  if (q.id === d.value) setLesson(q)
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
                    fontWeight: 600,
                    color: "#00aaf4",
                  }}
                >
                  Фамилия имя ученика
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    border: "0px solid red",
                    fontWeight: 600,
                    color: "#00aaf4",
                  }}
                >
                  Дата прохождения
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    border: "0px solid red",
                    fontWeight: 600,
                    color: "#00aaf4",
                  }}
                >
                  Работы студентов
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    backgroundColor: "#d9f4ff",
                    borderTopRightRadius: 16,
                    border: "0px solid red",
                    fontWeight: 600,
                    color: "#00aaf4",
                  }}
                >
                  Результат
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(search ? searchedHomeworks : homeworks).map((q) => (
                <>
                  <Table.Row
                    style={{ height: 52 }}
                    onClick={() => {
                      getHomework(q.id)
                    }}
                  >
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {(!search ? q.studentworks[0] : q).student.user.last_name}{" "}
                      {
                        (!search ? q.studentworks[0] : q).student.user
                          .first_name
                      }
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {q.ends_at
                        ? q.ends_at
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
                            .reverse()
                        : ""}
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      Открыть работу
                    </Table.Cell>
                    <Table.Cell style={{ border: "0px solid red" }}>
                      {(!search ? q.studentworks[0] : q).points}/100
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
