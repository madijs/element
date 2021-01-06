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
} from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { groupsApi } from "../config/apiUrls"
import TeacherMarksTable from "./TeacherMarksTable"
import TeachersMarksTable from "./TeacherMarksTable"

const TeacherMarks = () => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const [courses, setCourses] = useState([])
  const [groups, setGroups] = useState([])
  const [group, setGroup] = useState(null)
  const [course, setCourse] = useState(null)
  const [students, setStudents] = useState([])
  const getGroups = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type), {})
      .onStatus((res) => {
        const grps = []
        const crss = []
        res.data.results.map((q) => {
          grps.push(q)
          crss.push(q.course)
        })
        if (grps.length) {
          setGroup(grps[0])
          getPoints(grps[0].id)
        }
        if (crss.length) {
          setCourse(crss[0])
        }
        setGroups(grps)
        setCourses(crss)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getPoints = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type) + id + "/", {})
      .onStatus((res) => {
        setStudents(res.data.students)
        console.log(res.data.students)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getGroups()
    return () => {}
  }, 200)
  return (
    <>
      <div style={{ marginTop: 110 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "29x",
            color: "#005cff",
            marginBottom: 8,
          }}
        >
          Достижения учеников
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Select
              style={{
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                borderRadius: 10,
                color: "#2c3854",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
              }}
              value={course ? course.id : ""}
              options={courses.map((q) => ({
                key: q.id,
                value: q.id,
                text: q.title,
              }))}
              onChange={(e, d) => {
                courses.map((q) => {
                  if (q.id === d.value) {
                    setCourse(q)
                  }
                })
                let grp = false
                groups.map((q, i) => {
                  if (q.course.id === d.value && !grp) {
                    setGroup(q)
                    getPoints(q.id)
                    grp = true
                  }
                })
              }}
            />
          </div>
          <div style={{ marginLeft: 20 }}>
            <Select
              style={{
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                borderRadius: 10,
                color: "#2c3854",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
              }}
              value={group ? group.id : ""}
              options={groups
                .filter((q) => q.course.id === course.id)
                .map((q) => ({ key: q.id, value: q.id, text: q.title }))}
              onChange={(e, d) => {
                groups.map((q) => {
                  if (q.id === d.value) {
                    setGroup(q)
                    getPoints(q.id)
                  }
                })
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 34 }}>
          <TeachersMarksTable data={students} />
        </div>
      </div>
    </>
  )
}

export default TeacherMarks
