import React, { useState, useEffect } from "react"
import { Button } from "semantic-ui-react"
import { ordersApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import { useSelector, useDispatch } from "react-redux"

const SelectCourseThirdStep = (props) => {
  const {
    courses,
    setCourses,
    groups,
    setGroups,
    choosedWeekDays,
    setChoosedWeekDays,
    lessonTime,
    setLessonTime,
    step,
    setStep,
    coursesCount,
    setCoursesCount,
  } = props
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [coursesResult, setCoursesResult] = useState([])
  const getCoursesResult = () => {
    const cr = []
    groups.map((q) => {
      let have_wd = false
      let have_time = false
      console.log(q)
      if (!q.shedules) return <></>
      if (!q.shedules.weekday) return <></>
      choosedWeekDays.map((w) => {
        if (q.shedules.weekday.filter((r) => r === w + 1).length) {
          have_wd = true
        }
      })
      lessonTime.map((w) => {
        if (
          w.id === 1 &&
          parseInt(q.shedules.time.slice(0, 2)) <= 13 &&
          parseInt(q.shedules.time.slice(0, 2)) >= 8
        ) {
          have_time = true
        } else if (
          w.id === 2 &&
          parseInt(q.shedules.time.slice(0, 2)) <= 17 &&
          parseInt(q.shedules.time.slice(0, 2)) >= 13
        ) {
          have_time = true
        } else if (
          w.id === 2 &&
          parseInt(q.shedules.time.slice(0, 2)) <= 20 &&
          parseInt(q.shedules.time.slice(0, 2)) >= 17
        ) {
          have_time = true
        }
      })
      if (!have_wd || !have_time) return <></>
      setCoursesCount(coursesCount + 1)
      cr.push(
        <>
          <div
            style={{
              height: 160,
              backgroundColor: "#f7faf4",
              marginLeft: 30,
              marginRight: 10,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                width: 16,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                backgroundColor: "#b3e0ff",
              }}
            ></div>
            <div
              style={{
                width: 160,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {q.course.image ? <img src={q.course.image} /> : <></>}
            </div>
            <div style={{ width: "60%" }}>
              <div
                style={{
                  float: "right",
                  color: "#005cff",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: "14,63px",
                  marginTop: -10,
                }}
              >
                Групповые занятие
              </div>
              <div
                style={{
                  color: "#2c3854",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "20px",
                  marginTop: 10,
                }}
              >
                {q.course.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: "15px",
                  color: "#2c3854",
                }}
              >
                {q.course.description}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: "20px",
                    color: "#00aaf4",
                    fontWeight: 600,
                  }}
                >
                  {q.course.currency} {q.course.price} /
                </div>
                <div>
                  <Button
                    style={{
                      width: 178,
                      height: 33,
                      backgroundColor: "#00aaf4",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    content={"Записаться"}
                    onClick={() => {
                      apiPost(ordersApi, {
                        group: q.id,
                        bonuses: profile.elementProfile.bonuses,
                      })
                        .onStatus(
                          (res) => {
                            console.log(res.data)
                            if (res.status === 201) {
                              window.open(res.data.confirmation_url, "_blank")
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
          </div>
        </>,
      )
    })
    setCoursesResult(cr)
  }
  useEffect(() => {
    getCoursesResult()
    return () => {}
  }, [])
  return (
    <>
      <div style={{ marginTop: 30 }}>
        {groups.map((q) => {
          let have_wd = false
          let have_time = false
          console.log(q)
          if (!q.shedules) return <></>
          if (!q.shedules.weekday) return <></>
          choosedWeekDays.map((w) => {
            if (q.shedules.weekday.filter((r) => r === w + 1).length) {
              have_wd = true
            }
          })
          lessonTime.map((w) => {
            if (
              w.id === 1 &&
              parseInt(q.shedules.time.slice(0, 2)) <= 13 &&
              parseInt(q.shedules.time.slice(0, 2)) >= 8
            ) {
              have_time = true
            } else if (
              w.id === 2 &&
              parseInt(q.shedules.time.slice(0, 2)) <= 17 &&
              parseInt(q.shedules.time.slice(0, 2)) >= 13
            ) {
              have_time = true
            } else if (
              w.id === 2 &&
              parseInt(q.shedules.time.slice(0, 2)) <= 20 &&
              parseInt(q.shedules.time.slice(0, 2)) >= 17
            ) {
              have_time = true
            }
          })
          if (!have_wd || !have_time) return <></>
          setCoursesCount(coursesCount + 1)
          return (
            <>
              <div
                style={{
                  height: 160,
                  backgroundColor: "#f7faf4",
                  marginLeft: 30,
                  marginRight: 10,
                  boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: 16,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    backgroundColor: "#b3e0ff",
                  }}
                ></div>
                <div
                  style={{
                    width: 160,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {q.course.image ? <img src={q.course.image} /> : <></>}
                </div>
                <div style={{ width: "60%" }}>
                  <div
                    style={{
                      float: "right",
                      color: "#005cff",
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: "14,63px",
                      marginTop: -10,
                    }}
                  >
                    Групповые занятие
                  </div>
                  <div
                    style={{
                      color: "#2c3854",
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: "20px",
                      marginTop: 10,
                    }}
                  >
                    {q.course.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: "15px",
                      color: "#2c3854",
                    }}
                  >
                    {q.course.description}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        lineHeight: "20px",
                        color: "#00aaf4",
                        fontWeight: 600,
                      }}
                    >
                      {q.course.currency} {q.course.price} /
                    </div>
                    <div>
                      <Button
                        style={{
                          width: 178,
                          height: 33,
                          backgroundColor: "#00aaf4",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: 16,
                          lineHeight: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        content={"Записаться"}
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
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default SelectCourseThirdStep
