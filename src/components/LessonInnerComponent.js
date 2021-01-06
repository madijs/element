import React, { useState, useEffect } from "react"
import { Player } from "video-react"

const LessonInnerComponent = (props) => {
  const {
    lesson,
    setLesson,
    lessonInformation,
    setLessonInformation,
    previous,
    setPrevious,
    next,
    setNext,
    lessons,
    getLessonInformation,
  } = props
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
            setLesson(null)
            setLessonInformation(null)
            setPrevious(null)
            setNext(null)
          }}
        >
          <div>
            <img src={"./assets/img/my_courses/arrow_left_small.png"} />
          </div>
          <div style={{ marginLeft: 4 }}>{"НАЗАД К УРОКАМ"}</div>
        </div>
        <div style={{ marginTop: 40, display: "flex" }}>
          <div style={{ marginRight: 50, width: 800 }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent:
                  next && previous
                    ? "space-between"
                    : next
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                style={{
                  width: 226,
                  height: 56,
                  backgroundColor: "#d9f4ff",
                  display: previous ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 16,
                  boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#00aaf4",
                }}
                onClick={() => {
                  setLesson(previous)
                  getLessonInformation(previous.topics[0].id)
                  lessons.map((q, i) => {
                    if (q.id === previous.id) {
                      setPrevious(i > 0 ? lessons[i - 1] : null)
                      setNext(i < lessons.length - 1 ? lessons[i + 1] : null)
                    }
                  })
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <img src="./assets/img/my_courses/previous.png" />
                </div>
                <div>Предыдущий урок</div>
              </div>
              <div
                style={{
                  width: 226,
                  height: 56,
                  backgroundColor: "#d9f4ff",
                  display: next ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 16,
                  boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#00aaf4",
                }}
                onClick={() => {
                  setLesson(next)
                  getLessonInformation(next.topics[0].id)
                  lessons.map((q, i) => {
                    if (q.id === next.id) {
                      setPrevious(i > 0 ? lessons[i - 1] : null)
                      setNext(i < lessons.length - 1 ? lessons[i + 1] : null)
                    }
                  })
                }}
              >
                <div>Следующий урок</div>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <img src="./assets/img/my_courses/next.png" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 24,
                  color: "#2c3854",
                  lineHeight: "29,26px",
                }}
              >
                {lessonInformation.title}
              </div>
              {lessonInformation.videos.map((q) => (
                <>
                  <div style={{ marginTop: 20, width: "100%", height: 400 }}>
                    <Player
                      fluid={false}
                      width={800}
                      height={400}
                      src={q.file}
                    />
                  </div>
                </>
              ))}
              <div
                style={{
                  marginTop: 40,
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "#2c3854",
                }}
              >
                {lessonInformation.description}
              </div>
              <div
                style={{
                  marginTop: 40,
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "#00aaf4",
                }}
              >
                Дополнительный материал для скачивания
              </div>
              <div style={{ marginTop: 16 }}>
                {lessonInformation.presentations.map((q) => {
                  console.log(q.file.split("/")[q.file.split("/").length - 1])
                  return (
                    <>
                      <div
                        style={{
                          width: 360,
                          height: 66,
                          backgroundColor: "#ffffff",
                          display: "inline-block",
                          marginRight: 20,
                        }}
                        onClick={() => {
                          window.open(q.file)
                        }}
                      >
                        <div
                          style={{
                            width: 360,
                            height: 66,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflowX: "hidden",
                            padding: 20,
                          }}
                        >
                          {q.description
                            ? q.description
                            : q.file
                            ? q.file.split("/")[q.file.split("/").length - 1]
                            : ""}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
          <div
            style={{
              width: 320,
              height: 226,
              borderRadius: 8,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
              backgroundColor: "#ffffff",
              display: "none",
            }}
          >
            <div
              style={{
                width: 320,
                height: 50,
                backgroundColor: "#d9f4ff",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                display: "flex",
                padding: 15,
                alignItems: "center",
                color: "#00aaf4",
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Домашнее задание
            </div>
            <div
              style={{
                width: 320,
                height: 176,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonInnerComponent
