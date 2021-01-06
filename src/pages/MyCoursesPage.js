import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { groupsApi, lessonsApi, topicsApi } from "../config/apiUrls"
import MyCoursesComponent from "../components/MyCoursesComponent"
import CourseInnerComponent from "../components/CourseInnerComponent"
import LessonInnerComponent from "../components/LessonInnerComponent"

const MyCoursesPage = (props) => {
  const [course, setCourse] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [groups, setGroups] = useState(null)
  const [lessons, setLessons] = useState([])
  const [lesson, setLesson] = useState(null)
  const [courseInformation, setCourseInformation] = useState(null)
  const [lessonInformation, setLessonInformation] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [next, setNext] = useState(null)
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  const getCourseInformation = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type) + id + "/", {})
      .onStatus((res) => {
        console.log(res.data)
        setLessons(res.data.lessons.filter((q) => q.topics.length > 0))
        setCourseInformation(res.data.course)
        setTeachers(res.data.teachers)
        console.log(res.data.teachers)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getLessonInformation = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(topicsApi + id + "/", {})
      .onStatus(
        (res) => {
          console.log(res.data)
          setLessonInformation(res.data)
          // setLessons(res.data.lessons)
          // setCourseInformation(res.data.course)
        },
        200,
        500,
      )
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  return (
    <>
      {lessonInformation ? (
        <LessonInnerComponent
          lessons={lessons}
          lesson={lesson}
          setLesson={setLesson}
          lessonInformation={lessonInformation}
          setLessonInformation={setLessonInformation}
          previous={previous}
          setPrevious={setPrevious}
          next={next}
          setNext={setNext}
          getLessonInformation={getLessonInformation}
        />
      ) : courseInformation ? (
        <CourseInnerComponent
          courseInformation={courseInformation}
          setCourseInformation={setCourseInformation}
          lessonInformation={lessonInformation}
          setLessonInformation={setLessonInformation}
          course={course}
          setCourse={setCourse}
          lessons={lessons}
          setLessons={setLessons}
          lesson={lesson}
          setLesson={setLesson}
          getLessonInformation={getLessonInformation}
          setPrevious={setPrevious}
          setNext={setNext}
          teachers={teachers}
          setTeachers={setTeachers}
        />
      ) : (
        <MyCoursesComponent
          courses={courses}
          setCourses={setCourses}
          course={course}
          setCourse={setCourse}
          getCourseInformation={getCourseInformation}
          groups={groups}
          setGroups={setGroups}
          teachers={teachers}
          setTeachers={setTeachers}
        />
      )}
    </>
  )
}

export default MyCoursesPage
