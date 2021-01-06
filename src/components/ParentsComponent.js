import React, { useState, useEffect } from "react"
import { Button, Input, Divider } from "semantic-ui-react"
import ParentComponent from "./ParentComponent"

const ParentsComponent = (props) => {
  const {
    pageState,
    setPageState,
    parentFirstNameInput,
    setParentFirstNameInput,
    parentLastNameInput,
    setParentLastNameInput,
    parentEmailInput,
    setParentEmailInput,
    parentNumberInput,
    setParentNumberInput,
    parents,
    setParents,
    adding,
    setAdding,
    submitParents,
  } = props
  return (
    <>
      <div>
        <div style={{ display: pageState === 1 ? "block" : "none" }}>
          {parents.map((q, i) => {
            if (i === 0) {
              return (
                <>
                  <div>
                    <ParentComponent
                      parentFirstNameInput={q.first_name}
                      parentLastNameInput={q.last_name}
                      parentEmailInput={q.email}
                      parentNumberInput={q.phone.slice(1, q.phone.length)}
                      setParentFirstNameInput={(value) => {
                        const ps = parents.map((w, j) => {
                          if (j === i) {
                            w.first_name = value
                          }
                          return w
                        })
                        setParents(ps)
                      }}
                      setParentLastNameInput={(value) => {
                        const ps = parents.map((w, j) => {
                          if (j === i) {
                            w.last_name = value
                          }
                          return w
                        })
                        setParents(ps)
                      }}
                      setParentEmailInput={(value) => {
                        const ps = parents.map((w, j) => {
                          if (j === i) {
                            w.email_name = value
                          }
                          return w
                        })
                        setParents(ps)
                      }}
                      setParentNumberInput={(value) => {
                        const ps = parents.map((w, j) => {
                          if (j === i) {
                            w.phone = "+" + value
                          }
                          return w
                        })
                        setParents(ps)
                      }}
                    />
                    <Divider />
                  </div>
                </>
              )
            }
          })}
          {adding && (
            <>
              <ParentComponent
                parentFirstNameInput={parentFirstNameInput}
                parentLastNameInput={parentLastNameInput}
                parentEmailInput={parentEmailInput}
                parentNumberInput={parentNumberInput}
                setParentFirstNameInput={setParentFirstNameInput}
                setParentLastNameInput={setParentLastNameInput}
                setParentEmailInput={setParentEmailInput}
                setParentNumberInput={setParentNumberInput}
              />
            </>
          )}
          <div style={{ marginTop: 60 }}>
            {parents.length == 0 && (
              <Button
                content="Добавить родителя +"
                style={{
                  fontWeight: 100,
                  width: 690,
                  height: 56,
                  color: "#c2cfe0",
                  border: "2px solid #c2cfe0",
                  borderRadius: 16,
                  backgroundColor: "#f8f8f8",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 16,
                  display: adding ? "none" : "",
                  //lineHeight: 20,
                }}
                onClick={() => {
                  setAdding(true)
                }}
              />
            )}
            {adding && (
              <Button
                content="Отмена"
                style={{
                  fontWeight: 100,
                  width: 690,
                  height: 56,
                  color: "#f22e2e",
                  border: "2px solid #f22e2e",
                  borderRadius: 16,
                  backgroundColor: "#f8f8f8",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 16,
                  display: adding ? "" : "none",
                  //lineHeight: 20,
                }}
                onClick={() => {
                  setAdding(false)
                }}
              />
            )}
          </div>
          <div style={{ marginTop: 64 }}>
            <Button
              content="Сохранить данные"
              style={{
                fontWeight: 100,
                width: 690,
                height: 56,
                color: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                borderRadius: 16,
                backgroundColor: "#005cff",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: 16,
                //lineHeight: 20,
              }}
              onClick={submitParents}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentsComponent
