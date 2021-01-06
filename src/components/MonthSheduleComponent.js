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
const weekDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
]

const MonthSheduleComponent = () => {
  const [monthIndex, setMonthIndex] = useState(today.getMonth())
  const [rows, setRows] = useState([])
  const [yearIndex, setYearIndex] = useState(today.getFullYear())
  const [groups, setGroups] = useState([])
  const getGroups = (month_index) => {
    apiGet(timetableApi, { month_index })
      .onStatus((res) => {
        console.log(res.data.results)
        setGroups(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const updateRows = (year_index, month_index) => {
    const tableBody = []
    const firstDayOfMonth = new Date(year_index, month_index, 1)
    for (var i = 0; i < 6; i++) {
      const week = []
      for (var j = 0; j < 7; j++) {
        const day = new Date(
          year_index,
          month_index,
          i * 7 +
            j -
            (firstDayOfMonth.getDay() === 0 ? 5 : firstDayOfMonth.getDay() - 2),
        )
        week.push({ day: day.getDate(), month: day.getMonth() })
      }
      if (i === 5 && week[0].day < 24) {
        break
      }
      tableBody.push(week)
    }
    setRows(tableBody)
  }
  useEffect(() => {
    getGroups(monthIndex + 1)
    updateRows(yearIndex, monthIndex)
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
                setYearIndex(monthIndex === 0 ? yearIndex - 1 : yearIndex)
                setMonthIndex(monthIndex > 0 ? monthIndex - 1 : 11)
                getGroups((monthIndex > 0 ? monthIndex - 1 : 11) + 1)
                updateRows(
                  monthIndex === 0 ? yearIndex - 1 : yearIndex,
                  monthIndex > 0 ? monthIndex - 1 : 11,
                )
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
              {months[monthIndex] + " " + yearIndex}
            </p>
            <img
              src="./assets/img/index_table/next.png"
              onClick={() => {
                setYearIndex(monthIndex === 11 ? yearIndex + 1 : yearIndex)
                setMonthIndex(monthIndex < 11 ? monthIndex + 1 : 0)
                getGroups((monthIndex === 11 ? yearIndex + 1 : yearIndex) + 1)
                updateRows(
                  monthIndex === 11 ? yearIndex + 1 : yearIndex,
                  monthIndex < 11 ? monthIndex + 1 : 0,
                )
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
          <Table celled>
            <Table.Header>
              <Table.Row>
                {weekDays.map((q) => (
                  <>
                    <Table.HeaderCell
                      style={{
                        width: 100 / 7 + "%",
                        backgroundColor: "#d9f4ff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 600,
                          color: "#00aaf4",
                        }}
                      >
                        {q}
                      </div>
                    </Table.HeaderCell>
                  </>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((q) => (
                <>
                  <Table.Row>
                    {q.map((w) => (
                      <>
                        <Table.Cell>
                          <div
                            style={{
                              color: w.month === monthIndex ? "black" : "gray",
                              width: 135,
                              minHeight: 130,
                            }}
                          >
                            {w.day}
                            {w.month === monthIndex ? (
                              groups.map((g) => (
                                <>
                                  <div>
                                    {[g.lessons, g.homeworks, g.events].map(
                                      (l, h) => (
                                        <>
                                          {l.map((o) => {
                                            const stat = new Date(o.starts_at)
                                            const chkdt = new Date(
                                              yearIndex,
                                              monthIndex,
                                              w.day,
                                            )
                                            if (
                                              stat.getFullYear() ===
                                                chkdt.getFullYear() &&
                                              stat.getMonth() ===
                                                chkdt.getMonth() &&
                                              stat.getDate() === chkdt.getDate()
                                            ) {
                                              return (
                                                <>
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
                                                    <p
                                                      style={{
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        color: "#2c3854",
                                                        marginLeft: 10,
                                                      }}
                                                    >
                                                      {g.course.title}
                                                    </p>
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
                              ))
                            ) : (
                              /*
                              groups.map((l) => {
                                const hwdt = new Date(l.homework_starts_at)
                                const lsdt = new Date(
                                  hwdt.getTime() - l.duration * 60000,
                                )
                                const chkdt = new Date(
                                  yearIndex,
                                  monthIndex,
                                  w.day,
                                )
                                if (
                                  lsdt.getFullYear() === chkdt.getFullYear() &&
                                  lsdt.getMonth() === chkdt.getMonth() &&
                                  lsdt.getDate() === chkdt.getDate()
                                ) {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                          alignItems: "center",
                                          backgroundColor: "#d9f4ff",
                                          borderRadius: 8,
                                        }}
                                      >
                                        <img src="./assets/img/index_table/lesson.png" />
                                        <p
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#2c3854",
                                            marginLeft: 10,
                                          }}
                                        >
                                          {l.title}
                                        </p>
                                      </div>
                                    </>
                                  )
                                }
                                return <></>
                              })*/
                              <></>
                            )}
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

export default MonthSheduleComponent
