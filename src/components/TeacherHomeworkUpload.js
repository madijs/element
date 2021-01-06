import React, { useState, useEffect } from "react"
import { TextArea, Input, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { apiPut } from "../utils/apiConnector"
import { studentWorksApi } from "../config/apiUrls"

const TeacherHomeworkUpload = (props) => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [points, setPoints] = useState("")
  const [comment, setComment] = useState("")
  const { pageState, homework, setModal } = props
  return (
    <>
      <div>
        <div
          style={{
            display: pageState === 2 ? "block" : "none",
            width: "100%",
            marginTop: 20,
          }}
        >
          <TextArea
            style={{
              height: 400,
              fontWeight: 500,
              fontSize: 16,
              width: "100%",
              backgroundColor: "#f5f6f8",
              border: "1px solid #c2cfe0",
              borderRadius: 16,
              padding: 10,
            }}
            value={
              homework.studentworks[0].task_solutions
                ? homework.studentworks[0].task_solutions.length > 0
                  ? homework.studentworks[0].task_solutions[0].task.text
                  : ""
                : ""
            }
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#2c3854",
              marginTop: 56,
            }}
          >
            {"Оценка работы"}
          </div>
          <div style={{ marginTop: 20 }}>
            <Input
              type="number"
              style={{
                width: 66,
                height: 32,
              }}
              onChange={(e, d) => {
                setPoints(d.value)
              }}
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#c2cfe0",
              }}
            >
              /20
            </span>
            <Button
              style={{
                marginLeft: 10,
                width: 66,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#00aaf4",
                color: "#ffffff",
              }}
              onClick={() => {}}
              content="OK"
            />
          </div>
          <div
            style={{
              marginTop: 20,
              fontWeight: 600,
              fontSize: 16,
              color: "#2c3854",
            }}
          >
            Комментарий к работе
          </div>
          <div style={{ marginTop: 4 }}>
            <TextArea
              style={{
                height: 84,
                borderRadius: 16,
                backgroundColor: "#f5f6f8",
                border: "1px solid #c2cfe0",
                width: "100%",
                padding: 10,
              }}
              placeholder={
                homework.studentworks[0].task_solutions
                  ? homework.studentworks[0].task_solutions.length > 0
                    ? homework.studentworks[0].task_solutions[0]
                        .teachers_comment
                    : ""
                  : ""
              }
              value={comment}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Button
              style={{
                width: 362,
                height: 56,
                backgroundColor: "#005cff",
                borderRadius: 16,
                color: "white",
                fontWeight: 600,
                fontSize: 16,
              }}
              content={"Сохранить изменения и закрыть"}
              disabled={points === ""}
              onClick={() => {
                const req = {}
                req.points = points
                req.teachers_comment = comment
                const type = profile.elementProfile
                  ? profile.elementProfile.type
                  : -1
                if (type === -1) return
                apiPut(
                  studentWorksApi(
                    type,
                    "tasks-solutions",
                    homework.studentworks[0].task_solutions[0].id,
                  ),
                  req,
                )
                  .onStatus(
                    (req) => {
                      console.log(req)
                    },
                    200,
                    201,
                    202,
                    203,
                    204,
                    400,
                  )
                  .onFail(() => {})
                  .afterAll(() => {
                    setModal(false)
                  })
                  .startSingle()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherHomeworkUpload
