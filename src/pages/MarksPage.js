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
import TeacherMarks from "../components/TeacherMarks"
import StudentMarks from "../components/StudentMarks"

const MarksPage = (props) => {
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  return (
    <>
      <div style={{ margin: 80 }}>
        {profile.elementProfile ? (
          profile.elementProfile.type === 1 ? (
            <>{<TeacherMarks />}</>
          ) : profile.elementProfile.type === 0 ? (
            <>{<StudentMarks />}</>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default MarksPage
