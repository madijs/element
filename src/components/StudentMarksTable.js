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

const StudentMarksTable = (props) => {
  const { data } = props
  const getResult = () => {
    let res = 0
    data.map((q) => {
      res += parseInt(q.points)
    })
    if (data.length) {
      return res / data.length
    }
    return ""
  }
  return (
    <>
      <div>
        <Table celled style={{ borderRadius: 16, border: "0px solid red" }}>
          <Table.Header>
            <Table.Row>
              {data.map((q, i) => (
                <>
                  <Table.HeaderCell
                    style={{
                      borderTopLeftRadius: i === 0 ? 16 : 0,
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
              ))}
              <Table.HeaderCell
                style={{
                  borderTopRightRadius: 16,
                  width: 160,
                  backgroundColor: "#d9f4ff",
                  paddingLeft: 30,
                  borderBottom: "0px solid red",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "#00aaf4",
                }}
              >
                Результат
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {data.map((q, i) => (
                <>
                  <Table.Cell
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "#2c3854",
                      paddingLeft: 30,
                      border: "0px solid red",
                      borderBottomLeftRadius: i === 0 ? 16 : 0,
                    }}
                  >
                    {q.points}
                  </Table.Cell>
                </>
              ))}
              <Table.Cell
                style={{
                  borderBottomRightRadius: 16,
                  width: 160,
                  paddingLeft: 30,
                  borderBottom: "0px solid red",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "#2c3854",
                }}
              >
                {getResult()}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default StudentMarksTable
