import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { groupsApi } from "../config/apiUrls"

const MyCoursesComponent = (props) => {
  const [pageState, setPageState] = useState(0)
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const getGroups = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type), {})
      .onStatus((res) => {
        setGroups(res.data.results)
        setCourses(res.data.results.map((q) => q.course))
        console.log(res.data.results.map((q) => q.course))
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getGroups()
    return () => {}
  }, 200)
  const {
    courses,
    setCourses,
    course,
    setCourse,
    getCourseInformation,
    groups,
    setGroups,
    teachers,
    setTeachers,
  } = props
  return (
    <>
      <div>
        <div style={{ marginLeft: 80, marginTop: 90 }}>
          <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
            Мои курсы
          </p>
          {/*
          <div style={{ marginTop: 20, display: "flex" }}>
            <div style={{}}>
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
                Все курсы 7
              </p>
              <div
                style={{
                  border:
                    "1px solid" + (pageState === 0 ? "#005cff" : "#c2cfe0"),
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
                }}
                onClick={(e) => {
                  setPageState(1)
                }}
              >
                Непройденные 5
              </p>
              <div
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  border:
                    "1px solid" + (pageState === 1 ? "#005cff" : "#c2cfe0"),
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
                }}
                onClick={(e) => {
                  setPageState(2)
                }}
              >
                Пройденные 2
              </p>
              <div
                style={{
                  border:
                    "1px solid" + (pageState === 2 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
          </div>
          */}
        </div>
        <div style={{ marginRight: 80, marginLeft: 80 }}>
          <div style={{ marginTop: 5 }}>
            {courses.map((q, i) => (
              <>
                <div
                  style={{
                    width: 224,
                    height: 297,
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
                          height: 140,
                          width: "100%",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: 157,
                    }}
                  >
                    <div>
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
                          marginTop: -13,
                          overflowY: "hidden",
                          height: 40,
                        }}
                      >
                        <p>{q.description}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Button
                          fluid
                          content={"Перейти к курсу"}
                          style={{
                            backgroundColor: "#00aaf4",
                            borderRadius: 8,
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                          onClick={() => {
                            setCourse(q)
                            getCourseInformation(groups[i].id)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCoursesComponent
