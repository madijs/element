import React, { useState, useEffect } from "react"
import { chatApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import { useSelector, useDispatch } from "react-redux"

const CourseInnerComponent = (props) => {
  const {
    course,
    setCourse,
    lessons,
    setLessons,
    lesson,
    setLesson,
    courseInformation,
    setCourseInformation,
    lessonInformation,
    setLessonInformation,
    getLessonInformation,
    setPrevious,
    setNext,
    teachers,
    setTeachers,
  } = props
  const { dialogues, profile } = useSelector((state) => ({
    dialogues: state.dialogues,
    profile: state.profile,
  }))
  return (
    <>
      <div style={{ margin: 80 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#2c3854",
            fontSize: 12,
            fontWeight: 500,
            lineHeight: "13px",
            marginBottom: 40,
          }}
          onClick={() => {
            setCourse(null)
            setLessons([])
            setCourseInformation(null)
          }}
        >
          <div>
            <img src={"./assets/img/my_courses/arrow_left_small.png"} />
          </div>
          <div style={{ marginLeft: 4 }}>{"НАЗАД К МОИМ КУРСАМ"}</div>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#2c3854",
            lineHeight: "19,5px",
            marginBottom: 40,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>{course.title}</div>
          <div style={{ width: 400 }}>
            {teachers
              .filter((q) => q.user.user_id === profile.profile.user_id)
              .map((q) => {
                return (
                  <>
                    <div
                      style={{
                        width: "100%",
                        padding: 15,
                        backgroundColor: "#ffffff",
                        borderRadius: 8,
                        boxShadow: "0px 0px 10px rgba(0, 71, 255, 0.1)",
                        marginBottom: 8,
                        fontSize: 16,
                        color: "#2c3854",
                        lineHeight: "19,5px",
                        display: dialogues.data.filter((w) =>
                          w.chat_participant
                            ? w.chat_participant.user.user_id === q.user.user_id
                            : false,
                        ).length
                          ? "none"
                          : "block",
                      }}
                      className={"ui button"}
                      onClick={() => {
                        const req = {}
                        req.user_global_id = q.user.user_id
                        apiPost(chatApi, req)
                          .onStatus(
                            (res) => {
                              console.log(res)
                            },
                            200,
                            201,
                            204,
                            203,
                          )
                          .onFail(() => {})
                          .afterAll(() => {})
                          .startSingle()
                      }}
                    >
                      Создать чат с {q.user.first_name + " " + q.user.last_name}
                    </div>
                  </>
                )
              })}
          </div>
        </div>
        {lessons.map((q, i) => {
          return (
            <>
              <div
                style={{
                  width: "100%",
                  height: 56,
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  color: "#2c3854",
                  paddingLeft: 30,
                  paddingRight: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "spave-between",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "19,5px",
                  boxShadow: "0px 0px 10px rgba(0, 71, 255, 0.1)",
                  marginBottom: 24,
                }}
                className={"ui button"}
                onClick={() => {
                  setLesson(q)
                  setPrevious(i > 0 ? lessons[i - 1] : null)
                  setNext(i < lessons.length - 1 ? lessons[i + 1] : null)
                  getLessonInformation(q.topics[0].id)
                }}
              >
                <div>{q.topics[0].title}</div>
                {/*
                <div>
                  <img src="./assets/img/hw/chevron_right.png" />
                </div> 
              */}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default CourseInnerComponent
