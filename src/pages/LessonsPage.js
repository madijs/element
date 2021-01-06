import React, { useState, useEffect } from "react"
import { Card } from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { lessonsApi } from "../config/apiUrls"

const LessonsPage = () => {
  const [lessons, setLessons] = useState([])
  const getLessons = () => {
    apiGet(lessonsApi + "student/lessons/")
      .onStatus((res) => {
        console.log(res.data)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getLessons()
    return () => {}
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}

export default LessonsPage
