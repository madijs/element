import React, { useState, useEffect } from "react"
import { Input, Button } from "semantic-ui-react"

const ParentComponent = (props) => {
  const {
    parentFirstNameInput,
    setParentFirstNameInput,
    parentLastNameInput,
    setParentLastNameInput,
    parentEmailInput,
    setParentEmailInput,
    parentNumberInput,
    setParentNumberInput,
  } = props
  return (
    <>
      <div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Фамилия</div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={parentLastNameInput}
                onChange={(e, d) => {
                  setParentLastNameInput(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Имя</div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={parentFirstNameInput}
                onChange={(e, d) => {
                  setParentFirstNameInput(d.value)
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Электронная почта
              </div>
              <Input
                style={{
                  width: 426,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={parentEmailInput}
                type="email"
                onChange={(e, d) => {
                  setParentEmailInput(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Телефонный номер
              </div>
              <Input
                style={{
                  width: 232,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={parentNumberInput}
                type="number"
                onChange={(e, d) => {
                  setParentNumberInput(d.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentComponent
