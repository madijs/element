import React, { useState, useEffect } from "react"
import { groupsAvailableApi, ordersApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import { Input, Icon, Button } from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"

const CoursesComponent = (props) => {
  const {
    courses,
    setCourses,
    course,
    setCourse,
    setSelect,
    groups,
    setGroups,
    searchedCourses,
    setSearchedCourses,
  } = props
  const [inputs, setInputs] = useState(false)
  const [pageState, setPageState] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const getCourses = () => {
    apiGet(groupsAvailableApi, {})
      .onStatus((res) => {
        console.log(res.data.results.map((q) => q.course))
        setGroups(res.data.results)
        setCourses(res.data.results.map((q) => q.course))
        setSearchedCourses(res.data.results.map((q) => q.course))
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getCourses()
    return () => {}
  }, [])
  return (
    <>
      <div>
        <div style={{ marginLeft: 80, marginRight: 80, marginTop: 110 }}>
          <div>
            <Input
              fluid
              iconPosition="left"
              style={{
                paddingLeft: 10,
              }}
              value={searchInput}
              labelPosition="right"
              onChange={(e, d) => {
                if (d.value) setInputs(true)
                else setInputs(false)
                setSearchInput(d.value)
              }}
            >
              <Icon name="search" size="large" />
              <input
                placeholder={"Поиск по названию курса"}
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
                  let searchedCourse =
                    courses &&
                    courses.filter((course) =>
                      course.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()),
                    )

                  setSearchedCourses(searchedCourse)
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
          <div
            style={{
              marginTop: 20,
              height: 280,
              borderRadius: 16,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              backgroundColor: "#ffffff",
              paddingLeft: 40,
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: 550,
                position: "relative",
                zIndex: 33,
              }}
            >
              <p style={{ fontSize: 24, fontWeight: 600, color: "#00aaf4" }}>
                Нужно подобрать групповое занятие в удобное для тебя время?
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#2c3854",
                }}
              >
                Просто заполни данные и выбери время. <br />
                Мы с тобой свяжемся
              </p>
              <Button
                content={"Подобрать себе курс"}
                style={{
                  backgroundColor: "#005cff",
                  color: "#ffffff",
                  width: 242,
                  height: 56,
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                onClick={() => {
                  setSelect(true)
                }}
              />
            </div>
            <div
              style={{
                height: 280,
                position: "absolute",
                zIndex: 30,
                right: 105,
              }}
            >
              <img src="./assets/img/Group.png" />
            </div>
          </div>
          <div style={{ marginTop: 60 }}>
            <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
              Каталог курсов
            </p>
            <div style={{ marginTop: 20, display: "flex" }}>
              <div
                style={{}}
                onClick={(e) => {
                  setPageState(0)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
                style={{ cursor: "pointer" }}
              >
                <p
                  style={{
                    color: pageState === 0 ? "#2c3854" : "#c2cfe0",
                    fontSize: 16,
                    marginBottom: 1,
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    setPageState(0)
                  }}
                >
                  Все виды курсов
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
              <div
                onClick={(e) => {
                  setPageState(1)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
                style={{ cursor: "pointer" }}
              >
                <p
                  style={{
                    marginLeft: 40,
                    marginRight: 40,
                    color: pageState === 1 ? "#2c3854" : "#c2cfe0",
                    fontSize: 16,
                    marginBottom: 1,
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    setPageState(1)
                  }}
                >
                  Групповые занятия
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
              <div
                onClick={(e) => {
                  setPageState(2)
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = 0.7
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = 1
                }}
                style={{ cursor: "pointer" }}
              >
                <p
                  style={{
                    color: pageState === 2 ? "#2c3854" : "#c2cfe0",
                    fontSize: 16,
                    marginBottom: 1,
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    setPageState(2)
                  }}
                >
                  Курс предмета
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
          </div>
          <div style={{ marginTop: 5 }}>
            {searchedCourses.map((q) => (
              <>
                <div
                  style={{
                    width: 224,
                    height: 383,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                    display: "inline-block",
                    marginRight: 20,
                    marginTop: 30,
                  }}
                >
                  <div
                    style={{
                      height: 140,
                      width: "100%",
                      backgroundColor: "#c2cfe0",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    {q.image ? (
                      <img
                        src={q.image}
                        style={{
                          width: "100%",
                          height: 140,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8 }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#00aaf4",
                      }}
                    >
                      {q.title}
                    </p>
                    <div
                      style={{
                        overflowY: "hidden",
                        marginTop: -13,
                        height: 60,
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: 12,
                          color: "#2c3854",
                          overflowY: "hidden",
                        }}
                      >
                        {q.description}
                      </p>
                    </div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: "#c2cfe0",
                      }}
                    >
                      {q.grade} класс 12 лекций <br />
                      Чт (19:00-20:00) - Вс (14:00-16:00)
                    </p>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#00aaf4",
                        marginTop: -15,
                      }}
                    >
                      {q.currency} {q.price} /{" "}
                      {q.point_price ? q.point_price + " T" : ""}
                    </p>
                    <div>
                      <Button
                        fluid
                        content={"Купить"}
                        style={{
                          backgroundColor: "#00aaf4",
                          borderRadius: 8,
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: 16,
                          marginTop: -10,
                        }}
                        onClick={() => {
                          apiPost(ordersApi, {
                            group: q.id,
                            bonuses: profile.elementProfile.bonuses,
                          })
                            .onStatus(
                              (res) => {
                                console.log(res.data)
                                if (res.status === 201) {
                                  window.open(
                                    res.data.confirmation_url,
                                    "_blank",
                                  )
                                }
                              },
                              200,
                              201,
                              202,
                              203,
                              204,
                              400,
                            )
                            .onFail(() => {})
                            .afterAll(() => {})
                            .startSingle()
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div style={{ height: 100 }}></div>
        </div>
      </div>
    </>
  )
}
export default CoursesComponent
