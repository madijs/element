import React, { useState, useEffect } from "react"
import CoursesComponent from "../components/CoursesComponent"
import SelectCoursesComponent from "../components/SelectCoursesComponent"

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState({})
  const [select, setSelect] = useState(false)
  const [groups, setGroups] = useState([])
  const [searchedCourses, setSearchedCourses] = useState([])
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <>
      {select ? (
        <>
          <SelectCoursesComponent
            courses={courses}
            setCourses={setCourses}
            course={course}
            setCourse={setCourse}
            setSelect={setSelect}
            select={select}
            groups={groups}
            setGroups={setGroups}
          />
        </>
      ) : (
        <>
          <CoursesComponent
            setSelect={setSelect}
            courses={courses}
            setCourses={setCourses}
            course={course}
            setCourse={setCourse}
            groups={groups}
            setGroups={setGroups}
            searchedCourses={searchedCourses}
            setSearchedCourses={setSearchedCourses}
          />
        </>
      )}
    </>
  )
}

export default CoursesPage
