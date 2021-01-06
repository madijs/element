import React from "react"
import { useSelector } from "react-redux"
import TeacherHomework from "../components/TeacherHomework"
import StudentHomework from "../components/StudentHomework"

const HomeWorksPage = () => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  if (profile.elementProfile) {
    if (profile.elementProfile.type === 0) {
      return <StudentHomework />
    } else if (profile.elementProfile.type === 1) {
      return <TeacherHomework />
    }
  }
  return <></>
}

export default HomeWorksPage
