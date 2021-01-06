import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  Table,
  Select,
  Input,
  Dropdown,
  Card,
  Buttton,
  Checkbox,
} from "semantic-ui-react"

const TeachersMarksTable = (props) => {
  const { data } = props
  const getResult = (sw) => {
    let res = 0
    sw.map((q) => {
      res += parseInt(q.points)
    })
    if (sw.length) {
      return res / sw.length
    }
    return ""
  }
  return (
    <>
      <div>
        <Table celled style={{ borderRadius: 16, border: "0px solid red" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{
                  borderTopLeftRadius: 16,
                  backgroundColor: "#d9f4ff",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "#00aaf4",
                  paddingLeft: 30,
                  borderBottom: "0px solid red",
                  width: 360,
                }}
              >
                Фамилия Имя ученика
              </Table.HeaderCell>
              {data.map((q, i) => {
                if (i === 0) {
                  return q.studentwork_points.map((w, j) => (
                    <>
                      <Table.HeaderCell
                        style={{
                          backgroundColor: "#d9f4ff",
                          fontSize: 16,
                          fontWeight: 600,
                          lineHeight: "20px",
                          color: "#00aaf4",
                          paddingLeft: 30,
                          borderBottom: "0px solid red",
                        }}
                      >
                        Урок {i + 1}
                      </Table.HeaderCell>
                    </>
                  ))
                }
              })}
              <Table.HeaderCell
                style={{
                  borderTopRightRadius: 16,
                  backgroundColor: "#d9f4ff",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "#00aaf4",
                  paddingLeft: 30,
                  width: 160,
                  borderBottom: "0px solid red",
                }}
              >
                Результат
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((q, i) => (
              <>
                <Table.Row>
                  <Table.Cell
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "#2c3854",
                      paddingLeft: 30,
                      border: "0px solid red",
                      borderBottomLeftRadius: i === data.length - 1 ? 16 : 0,
                    }}
                  >
                    {q.user.last_name} {q.user.last_name}
                  </Table.Cell>
                  {q.studentwork_points.map((w, j) => (
                    <>
                      <Table.Cell
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          lineHeight: "20px",
                          color: "#2c3854",
                          paddingLeft: 15,
                          borderBottom: "0px solid red",
                        }}
                      >
                        {/*<Input
                          placeholder={w.points}
                          type="number"
                          size="small"
                          style={{ maxWidth: 90 }}
                        />*/}
                        {w.points}
                      </Table.Cell>
                    </>
                  ))}
                  <Table.Cell
                    style={{
                      borderBottomRightRadius: i === data.length - 1 ? 16 : 0,
                      width: 160,
                      paddingLeft: 30,
                      borderBottom: "0px solid red",
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "#2c3854",
                    }}
                  >
                    {getResult(q.studentwork_points)}
                  </Table.Cell>
                </Table.Row>
              </>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default TeachersMarksTable
