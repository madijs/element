import React, { useState, useEffect, cloneElement } from "react"
import { Checkbox } from "semantic-ui-react"
import PromoIndexComponent from "../components/PromoIndexComponent"
import MonthSheduleComponent from "../components/MonthSheduleComponent"
import WeekSheduleComponent from "../components/WeekSheduleComponent"
import { useSelector } from "react-redux"

const IndexPage = () => {
  const [checked, setChecked] = useState(false)
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <>
      <div>
        {profile.elementProifle ? (
          profile.elementProifle.type === 0 ? (
            <>
              <PromoIndexComponent />
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 110,
            marginRight: 80,
            marginLeft: 80,
          }}
        >
          <div style={{ color: "#005cff", fontWeight: 600, fontSize: 24 }}>
            Расписание на {!checked ? "месяц" : "неделю"}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                color: !checked ? "#005cff" : "#c2cfe0",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Месяц
            </div>
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Checkbox
                toggle
                checked={checked}
                onChange={(e, d) => {
                  setChecked(d.checked)
                }}
              />
            </div>
            <div
              style={{
                color: checked ? "#005cff" : "#c2cfe0",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Неделя
            </div>
          </div>
        </div>
        {checked ? <WeekSheduleComponent /> : <MonthSheduleComponent />}
      </div>
    </>
  )
}

export default IndexPage
