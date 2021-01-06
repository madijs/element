import React, { useState, useEffect } from "react"
import { Button } from "semantic-ui-react"

const SelectCourseFirstStep = (props) => {
  const {
    categories,
    category,
    setCategory,
    type,
    setType,
    step,
    setStep,
  } = props
  return (
    <>
      <div style={{ marginTop: 40 }}>
        <div style={{ marginLeft: 50, marginRight: 50 }}>
          {categories.map((q) => (
            <>
              <div
                style={{
                  display: "inline-block",
                  width: "33%",
                }}
                onClick={() => {
                  setCategory({ id: q.id })
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      category.id
                        ? category.id === q.id
                          ? q.image
                          : q.deactivated_image
                        : ""
                    }
                    style={{ width: 40 }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: category.id
                      ? category.id === q.id
                        ? "#00aaf4"
                        : "#c2cef0"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  {q.title}
                </div>
              </div>
            </>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 16,
              color: "#2c3854",
              marginTop: 40,
            }}
          >
            Какой вид курса хотите
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              marginLeft: -16,
              marginRight: -16,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 113,
                }}
                onClick={() => {
                  setType({ id: 1 })
                }}
              >
                <img
                  src={
                    "./assets/img/courses/education" +
                    (type.id ? (type.id === 1 ? "_blue" : "") : "") +
                    ".png"
                  }
                  style={{ width: 40 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: type.id
                      ? type.id === 1
                        ? "#00aaf4"
                        : "#c2cef0"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  Показать все
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 165,
                }}
                onClick={() => {
                  setType({ id: 2 })
                }}
              >
                <img
                  src={
                    "./assets/img/courses/group" +
                    (type.id ? (type.id === 2 ? "_blue" : "") : "") +
                    ".png"
                  }
                  style={{ width: 40 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: type.id
                      ? type.id === 2
                        ? "#00aaf4"
                        : "#c2cef0"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                  }}
                >
                  Групповое занятие
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setType({ id: 3 })
                }}
              >
                <img
                  src={
                    "./assets/img/courses/surface" +
                    (type.id ? (type.id === 3 ? "_blue" : "") : "") +
                    ".png"
                  }
                  style={{ width: 31 }}
                />
                <div
                  style={{
                    marginTop: 10,
                    color: type.id
                      ? type.id === 3
                        ? "#00aaf4"
                        : "#c2cef0"
                      : "#c2cef0",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: "19,5px",
                    textAlign: "center",
                    width: 129,
                  }}
                >
                  Курс предмета
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              width: 182,
              height: 36,
              color: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "19,5px",
              backgroundColor: "#005cff",
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
              borderRadius: 8,
            }}
            content={"Следуюший шаг"}
            disabled={!category.id || !type.id}
            onClick={() => {
              setStep(step + 1)
            }}
          />
        </div>
        <div style={{ height: 40 }}></div>
      </div>
    </>
  )
}

export default SelectCourseFirstStep
