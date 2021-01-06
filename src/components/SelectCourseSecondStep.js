import React, { useState, useEffect } from "react"
import { Button } from "semantic-ui-react"

const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]

const SelectCourseSecondStep = (props) => {
  const {
    choosedWeekDays,
    setChoosedWeekDays,
    lessonTime,
    setLessonTime,
    step,
    setStep,
  } = props
  return (
    <>
      <div style={{ marginTop: 40 }}>
        <div style={{ marginLeft: 50, marginRight: 50 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 125,
                }}
                onClick={() => {
                  const wd = lessonTime
                  const y = wd.filter((w, j) => w.id !== 1)
                  if (y.length === wd.length) y.push({ id: 1 })
                  setLessonTime(y)
                }}
              >
                <img
                  src="./assets/img/courses/morning_blue.png"
                  style={{ width: 40 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: lessonTime.filter((w, j) => w.id === 1).length
                      ? "#00aaf4"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  <div>Утро</div>
                  <div>(08:00-13:00)</div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 125,
                }}
                onClick={() => {
                  const wd = lessonTime
                  const y = wd.filter((w, j) => w.id !== 2)
                  if (y.length === wd.length) y.push({ id: 2 })
                  setLessonTime(y)
                }}
              >
                <img
                  src="./assets/img/courses/sun_blue.png"
                  style={{ width: 40 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: lessonTime.filter((w, j) => w.id === 2).length
                      ? "#00aaf4"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  <div>День</div>
                  <div>(13:00-17:00)</div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 125,
                }}
                onClick={() => {
                  const wd = lessonTime
                  const y = wd.filter((w, j) => w.id !== 3)
                  if (y.length === wd.length) y.push({ id: 3 })
                  setLessonTime(y)
                }}
              >
                <img
                  src="./assets/img/courses/night.png"
                  style={{ width: 40 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: lessonTime.filter((w, j) => w.id === 3).length
                      ? "#00aaf4"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  <div>Вечер</div>
                  <div>(17:00-20:00)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "19,5px",
            color: "#2c3854",
          }}
        >
          Выберите удобныe дни недели
        </div>
        <div
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
            display: "flex",
          }}
        >
          {weekDays.map((q, i) => (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "19,5px",
                  color: choosedWeekDays.filter((w, j) => w === i).length
                    ? "#00aaf4"
                    : "#c2cfe0",
                  border:
                    "1px solid " +
                    (choosedWeekDays.filter((w, j) => w === i).length
                      ? "#00aaf4"
                      : "#c2cfe0"),
                  padding: 16,
                  width: "14%",
                  borderTopLeftRadius: i === 0 ? 8 : 0,
                  borderBottomLeftRadius: i === 0 ? 8 : 0,
                  borderTopRightRadius: i === 6 ? 8 : 0,
                  borderBottomRightRadius: i === 6 ? 8 : 0,
                }}
                onClick={() => {
                  const wd = choosedWeekDays
                  const y = wd.filter((w, j) => w !== i)
                  if (y.length === wd.length) y.push(i)
                  setChoosedWeekDays(y)
                }}
              >
                {q}
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            marginTop: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              width: 242,
              height: 56,
              color: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "19,5px",
              backgroundColor: "#005cff",
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
              borderRadius: 8,
            }}
            content={"Подобрать себе курс"}
            onClick={() => {
              setStep(step + 1)
            }}
            disabled={!lessonTime.length || !choosedWeekDays.length}
          />
        </div>
        <div style={{ height: 60 }}></div>
      </div>
    </>
  )
}

export default SelectCourseSecondStep
