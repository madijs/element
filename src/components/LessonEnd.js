import React, { useState, useEffect } from "react"
import { Modal, Card, Table, Input, Button } from "semantic-ui-react"
import { apiPost } from "../utils/apiConnector"
import { lessonsApi } from "../config/apiUrls"
import { useDispatch, useSelector } from "react-redux"

const LessonEnd = (props) => {
  const { modal, setModal, students, setStudents, values, callback } = props
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  return (
    <>
      <div>
        <Modal
          open={modal}
          style={{ height: "max-content", marginTop: "-40vh", width: 620 }}
          size="small"
          onClose={() => {
            setModal(false)
          }}
        >
          <Card fluid>
            <Card.Content>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: 24,
                    color: "#2c3854",
                    lineHeight: "24px",
                  }}
                >
                  Урок завершен
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#c2cecf",
                    lineHeight: "19,5px",
                    marginTop: 8,
                  }}
                >
                  Все прошло отлично) Так держать
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40,
                  }}
                >
                  <img src="./assets/img/course_page/lesson_end.png" />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#2c3854",
                    lineHeight: "19,5px",
                    marginTop: 40,
                  }}
                >
                  Вы можете начислить ученикам терабаксы за активность
                </div>
                <div style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                  <Table style={{ borderRadius: 16 }}>
                    <Table.Header style={{ border: "0px solid red" }}>
                      <Table.Row
                        style={{ border: "0px solid red", height: 56 }}
                      >
                        <Table.HeaderCell
                          style={{
                            backgroundColor: "#d9f4ff",
                            border: "0px solid red",
                            borderTopLeftRadius: 16,
                            fontWeight: 600,
                            color: "#00aaf4",
                          }}
                        >
                          Ученики
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{
                            backgroundColor: "#d9f4ff",
                            border: "0px solid red",
                            fontWeight: 600,
                            color: "#00aaf4",
                          }}
                        >
                          {
                            //Время
                          }
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{
                            backgroundColor: "#d9f4ff",
                            borderTopRightRadius: 16,
                            border: "0px solid red",
                            fontWeight: 600,
                            color: "#00aaf4",
                          }}
                        >
                          Терабаксы
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {students.map((q, i) => (
                        <>
                          <Table.Row>
                            <Table.Cell style={{ border: "0px solid red" }}>
                              {q.user.first_name + " " + q.user.last_name}
                            </Table.Cell>
                            <Table.Cell style={{ border: "0px solid red" }}>
                              {
                                //38:59 мин
                              }
                            </Table.Cell>
                            <Table.Cell style={{ border: "0px solid red" }}>
                              <Input
                                type="number"
                                onChange={(e, d) => {
                                  values[i].value = parseInt(d.value)
                                }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                <div
                  style={{
                    marginTop: 40,
                    marginBottom: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      width: 346,
                      height: 56,
                      backgroundColor: "#005CFF",
                      boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                      borderRadius: 16,
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: 20,
                      color: "#FFFFFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    content={"Сохранить изменения и выйти"}
                    onClick={() => {
                      const type = profile.elementProfile
                        ? profile.elementProfile.type
                        : -1
                      if (type !== 1) {
                        callback()
                        return
                      }
                      const req = { gradings: [] }
                      students.map((q, i) => {
                        if (values[i].value !== 0) {
                          req.gradings.push({
                            student_id: q.user.id,
                            bonuses: values[i].value,
                          })
                        }
                      })
                      if (req.gradings.length > 0) {
                        apiPost(lessonsApi(type) + "grade-students/", req)
                          .onStatus(
                            (res) => {
                              console.log(res)
                            },
                            200,
                            201,
                            202,
                            203,
                            204,
                          )
                          .onFail(() => {})
                          .afterAll(() => {
                            callback()
                          })
                          .startSingle()
                      } else {
                        callback()
                      }
                    }}
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
        </Modal>
      </div>
    </>
  )
}

export default LessonEnd
