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
import { apiGet } from "../utils/apiConnector"
import { groupsApi } from "../config/apiUrls"
import StudentMarksTable from "./StudentMarksTable"

const StudentMarks = () => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [groups, setGroups] = useState([])
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState(null)
  const [allPoints, setAllPoints] = useState([])
  const [points, setPoints] = useState([])
  const [showAll, setShowAll] = useState(false)
  const getInformation = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type) + "participations/", {})
      .onStatus((res) => {
        const grps = []
        const crss = []
        const pts = []
        res.data.results.map((q) => {
          console.log(q)
          grps.push(q.group)
          crss.push(q.group.course)
          pts.push(q.studentwork_points)
        })
        if (crss.length) {
          setCourse(crss[0])
        }
        if (pts.length) {
          setPoints(pts[0])
        }
        setCourses(crss)
        setGroups(grps)
        setAllPoints(pts)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getInformation()
    return () => {}
  }, [])
  return (
    <>
      <div style={{ marginTop: 110 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: 8,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
                color: "#2c3854",
              }}
            >
              Выберите предмет
            </div>
            <Select
              style={{
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                borderRadius: 10,
                color: "#2c3854",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
              }}
              value={showAll ? "...." : course ? course.id : ""}
              text={showAll ? "...." : course ? course.title : ""}
              options={
                showAll
                  ? []
                  : courses.map((q) => ({
                      key: q.id,
                      value: q.id,
                      text: q.title,
                    }))
              }
              onChange={(e, d) => {
                courses.map((q, i) => {
                  if (q.id === course.id) {
                    setCourse(q)
                    setPoints(allPoints[i])
                  }
                })
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: 16,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
                color: "#2c3854",
              }}
            >
              Показать все результаты
            </div>
            <Checkbox
              toggle
              onChange={(e, d) => {
                setShowAll(d.checked)
              }}
            />
          </div>
        </div>
        <div>
          {showAll ? (
            <>
              {allPoints.map((q) => (
                <>
                  <div
                    style={{
                      marginTop: 40,
                      fontWeight: 600,
                      fontSize: 24,
                      lineHeight: "29x",
                      color: "#005cff",
                      marginBottom: 20,
                    }}
                  >
                    {q.title}
                  </div>
                  <StudentMarksTable data={q} />
                </>
              ))}
            </>
          ) : (
            <>
              <div
                style={{
                  marginTop: 40,
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: "29x",
                  color: "#005cff",
                  marginBottom: 20,
                }}
              >
                {course ? course.title : ""}
              </div>
              <StudentMarksTable data={points} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default StudentMarks
