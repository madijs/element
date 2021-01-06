import React, { useState, useEffect } from "react"
import { Card, Button, Input } from "semantic-ui-react"
import SelectCourseFirstStep from "./SelectCourseFirstStep"
import SelectCourseSecondStep from "./SelectCourseSecondStep"
import SelectCourseThirdStep from "./SelectCourseThirdStep"
import { apiGet } from "../utils/apiConnector"
import { categoryApi } from "../config/apiUrls"

const SelectCoursesComponent = (props) => {
  const {
    courses,
    setCourses,
    course,
    setCourse,
    select,
    setSelect,
    groups,
    setGroups,
  } = props
  const [step, setStep] = useState(0)
  const [type, setType] = useState({})
  const [category, setCategory] = useState({})
  const [types, setTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [choosedWeekDays, setChoosedWeekDays] = useState([])
  const [lessonTime, setLessonTime] = useState([])
  const [coursesCount, setCoursesCount] = useState(0)
  const getCategories = () => {
    apiGet(categoryApi, {})
      .onStatus((res) => {
        console.log(res.data.results)
        setCategories(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getCategories()
    return () => {}
  }, 200)
  return (
    <>
      <div
        style={{
          marginLeft: 80,
          marginRight: 80,
          marginTop: 110,
          display: "flex",
        }}
      >
        <div style={{ height: "100%", width: "47%" }}>
          <div
            style={{ display: "flex" }}
            onClick={() => {
              if (step === 0) {
                setSelect(false)
              }
            }}
          >
            <div>
              <img src="./assets/img/courses/arrow_left.png" />
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "19,5px",
                marginLeft: 10,
                color: "#2c3854",
              }}
            >
              Вернуться назад
            </div>
          </div>
          <div style={{ marginTop: 60 }}>
            <img src="./assets/img/courses/sitting_girl.png" />
          </div>
        </div>
        <div style={{ height: "100%", width: "52%" }}>
          <div style={{ width: "100%" }}>
            <Card
              fluid
              style={{
                border: "0px solid red",
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                borderRadius: 16,
              }}
            >
              <Card.Content>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: "#c2cfe0",
                  }}
                >
                  Шаг {step + 1} / 3
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 300,
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {step > -1 ? (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "4px solid #005cff",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: step === 0 ? 4 : 0,
                            borderBottomRightRadius: step === 0 ? 4 : 0,
                            height: 2,
                          }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "2px solid #c2cfe0",
                            borderTopLeftRadius: 2,
                            borderBottomLeftRadius: 2,
                            height: 1,
                          }}
                        ></div>
                      </>
                    )}
                    {step > 0 ? (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "4px solid #005cff",
                            height: 2,
                            borderTopRightRadius: step === 1 ? 4 : 0,
                            borderBottomRightRadius: step === 1 ? 4 : 0,
                          }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "2px solid #c2cfe0",
                            height: 1,
                          }}
                        ></div>
                      </>
                    )}
                    {step > 1 ? (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "4px solid #005cff",
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            height: 2,
                          }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: 100,
                            border: "2px solid #c2cfe0",
                            borderTopRightRadius: 2,
                            borderBottomRightRadius: 2,
                            height: 1,
                          }}
                        ></div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#2c3854",
                    lineHeight: "19,5px",
                  }}
                >
                  {step === 0 ? (
                    "Выберите интересующий Вас курс"
                  ) : step === 1 ? (
                    "Выберите удобное для Вас время"
                  ) : step === 2 ? (
                    <>
                      Результаты поиска{" "}
                      <span
                        style={{
                          color: "#00aaf4",
                          display: "inline-block",
                          marginLeft: 5,
                        }}
                      >
                        ({coursesCount})
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {step === 0 && (
                  <>
                    <SelectCourseFirstStep
                      categories={categories}
                      setCategory={setCategory}
                      category={category}
                      type={type}
                      setType={setType}
                      step={step}
                      setStep={setStep}
                    />
                  </>
                )}
                {step === 1 && (
                  <>
                    <SelectCourseSecondStep
                      choosedWeekDays={choosedWeekDays}
                      setChoosedWeekDays={setChoosedWeekDays}
                      lessonTime={lessonTime}
                      setLessonTime={setLessonTime}
                      step={step}
                      setStep={setStep}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <SelectCourseThirdStep
                      courses={courses}
                      setCourses={setCourses}
                      groups={groups}
                      setGroups={setGroups}
                      choosedWeekDays={choosedWeekDays}
                      setChoosedWeekDays={setChoosedWeekDays}
                      lessonTime={lessonTime}
                      setLessonTime={setLessonTime}
                      step={step}
                      setStep={setStep}
                      coursesCount={coursesCount}
                      setCoursesCount={setCoursesCount}
                    />
                  </>
                )}
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
      <div style={{ height: 100 }}></div>
    </>
  )
}
export default SelectCoursesComponent
