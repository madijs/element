import React, { useState, useEffect } from "react"
import { Table, Button } from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { timetableApi } from "../config/apiUrls"

const today = new Date()
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
]
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

const time_dict = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

const WeekSheduleComponent = () => {
  const [weekDelta, setWeekDelta] = useState(0)
  const [groups, setGroups] = useState([])
  const getGroups = (week_delta) => {
    apiGet(timetableApi, { week_delta })
      .onStatus((res) => {
        console.log(res.data.results)
        setGroups(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getGroups(weekDelta)
    return () => {}
  }, [])
  return (
    <>
      <div>
        <div
          style={{
            marginTop: 85,
            marginLeft: 80,
            marginRight: 80,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              minWidth: 304,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="./assets/img/index_table/prev.png"
              onClick={() => {
                setWeekDelta(weekDelta - 1)
                getGroups(weekDelta - 1)
              }}
              style={{ cursor: "pointer" }}
              onMouseOver={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = 1
              }}
            />
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#005cff",
                marginTop: 20,
              }}
            >
              {new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() -
                  (today.getDay() === 0 ? 6 : today.getDay() - 1) +
                  weekDelta * 7,
              ).getDate()}{" "}
              {months[
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() -
                    (today.getDay() === 0 ? 6 : today.getDay() - 1) +
                    weekDelta * 7,
                ).getMonth()
              ].slice(0, 3)}
              {" - "}
              {new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() -
                  (today.getDay() === 0 ? 6 : today.getDay() - 1) +
                  6 +
                  weekDelta * 7,
              ).getDate()}{" "}
              {months[
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() -
                    (today.getDay() === 0 ? 6 : today.getDay() - 1) +
                    6 +
                    weekDelta * 7,
                ).getMonth()
              ].slice(0, 3)}
            </p>
            <img
              src="./assets/img/index_table/next.png"
              onClick={() => {
                setWeekDelta(weekDelta + 1)
                getGroups(weekDelta + 1)
              }}
              style={{ cursor: "pointer" }}
              onMouseOver={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = 1
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: 182,
                height: 32,
                backgroundColor: "#d9f4ff",
                borderRadius: 8,
              }}
            >
              <img src="./assets/img/index_table/lesson.png" />
              <p style={{ fontSize: 12, fontWeight: 600, color: "#2c3854" }}>
                Групповые занятия
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: 182,
                height: 32,
                backgroundColor: "#fdefe3",
                borderRadius: 8,
                marginLeft: 20,
              }}
            >
              <img src="./assets/img/index_table/coffee.png" />
              <p style={{ fontSize: 12, fontWeight: 600, color: "#2c3854" }}>
                Домашние задание
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: 182,
                height: 32,
                backgroundColor: "#ffe7e5",
                borderRadius: 8,
                marginLeft: 20,
              }}
            >
              <img src="./assets/img/index_table/star.png" />
              <p style={{ fontSize: 12, fontWeight: 600, color: "#2c3854" }}>
                Мероприятия
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 20,
            marginLeft: 80,
            marginRight: 80,
          }}
        >
          <Table style={{ border: "0px solid red" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ border: "0px solid red", width: "9%" }}
                />
                {weekDays.map((q, i) => (
                  <>
                    <Table.HeaderCell
                      style={{
                        border: "0px solid red",
                        width: 91 / 7 + "%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          fontWeight: 600,
                          fontSize: 16,
                          lineHeight: "19,5px",
                        }}
                      >
                        <div style={{ color: "#00aaf4" }}>{q},</div>
                        <div style={{ color: "#2c3854", marginLeft: 5 }}>
                          {new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate() -
                              (today.getDay() === 0 ? 6 : today.getDay() - 1) +
                              weekDelta * 7 +
                              i,
                          ).getDate()}{" "}
                          {months[
                            new Date(
                              today.getFullYear(),
                              today.getMonth(),
                              today.getDate() -
                                (today.getDay() === 0
                                  ? 6
                                  : today.getDay() - 1) +
                                weekDelta * 7,
                            ).getMonth()
                          ].slice(0, 3)}
                        </div>
                      </div>
                    </Table.HeaderCell>
                  </>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {time_dict.map((q, i) => (
                <>
                  <Table.Row>
                    <Table.Cell
                      style={{
                        border: "0px solid red",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {q}
                    </Table.Cell>
                    {weekDays.map((w, j) => (
                      <>
                        <Table.Cell
                          style={{
                            border: "0px solid red",
                            backgroundColor: "#f9f9f9",
                            height: 101,
                            padding: 0,
                          }}
                        >
                          <div
                            style={{
                              height: 101,
                              backgroundColor: "#ffffff",
                              marginRight: 10,
                            }}
                          >
                            {groups.map((g) => (
                              <>
                                <div>
                                  {[g.lessons, g.homeworks, g.events].map(
                                    (l, h) => (
                                      <>
                                        {l.map((o) => {
                                          const stat = new Date(o.starts_at)
                                          const chkdt = new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate() -
                                              (today.getDay() === 0
                                                ? 6
                                                : today.getDay() - 1) +
                                              weekDelta * 7 +
                                              j,
                                            parseInt(q.slice(0, 2)),
                                          )
                                          if (
                                            (stat.getFullYear() ===
                                              chkdt.getFullYear() &&
                                              stat.getMonth() ===
                                                chkdt.getMonth() &&
                                              stat.getDate() ===
                                                chkdt.getDate() &&
                                              stat.getHours() ===
                                                chkdt.getHours()) ||
                                            (i === 0 &&
                                              stat.getFullYear() ===
                                                chkdt.getFullYear() &&
                                              stat.getMonth() ===
                                                chkdt.getMonth() &&
                                              stat.getDate() ===
                                                chkdt.getDate() &&
                                              stat.getHours() <
                                                chkdt.getHours()) ||
                                            (i === time_dict.length - 1 &&
                                              stat.getFullYear() ===
                                                chkdt.getFullYear() &&
                                              stat.getMonth() ===
                                                chkdt.getMonth() &&
                                              stat.getDate() ===
                                                chkdt.getDate() &&
                                              stat.getHours() >
                                                chkdt.getHours())
                                          ) {
                                            return (
                                              <>
                                                <div
                                                  style={{
                                                    borderRadius: 8,
                                                    boxShadow:
                                                      "0px 0px 10px rgba(0, 71, 255, 0.1) ",
                                                    height: 97,
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      backgroundColor:
                                                        h === 0
                                                          ? "#d9f4ff"
                                                          : h === 1
                                                          ? "#fdefe3"
                                                          : h === 2
                                                          ? "#ffe7e5"
                                                          : "#ffffff",
                                                      borderRadius: 8,
                                                      height: 32,
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        "./assets/img/index_table/" +
                                                        (h === 0
                                                          ? "lesson"
                                                          : h === 1
                                                          ? "coffee"
                                                          : h === 2
                                                          ? "star"
                                                          : "") +
                                                        ".png"
                                                      }
                                                      style={{ marginLeft: 10 }}
                                                    />
                                                    <div
                                                      style={{
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        color: "#2c3854",
                                                        marginLeft: 10,
                                                      }}
                                                    >
                                                      {h === 0
                                                        ? "Групповое занятие"
                                                        : h === 1
                                                        ? "Домашнее задание"
                                                        : h === 2
                                                        ? "Мероприятие"
                                                        : ""}
                                                    </div>
                                                  </div>
                                                  <div style={{ padding: 5 }}>
                                                    <div>{g.course.title}</div>
                                                    <div>{o.title}</div>
                                                  </div>
                                                </div>
                                              </>
                                            )
                                          }
                                        })}
                                      </>
                                    ),
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                        </Table.Cell>
                      </>
                    ))}
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

export default WeekSheduleComponent
