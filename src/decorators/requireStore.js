import ProfileWatchingWrapper from "./ProfileWatchingWrapper"
import React from "react"
import SelectStorePage from "../pages/SelectStorePage"

const decorator = () => (WrappedComponentClass) => () => {
  const accessDeniedPage = <SelectStorePage />
  const validator = (profile) => {
    return !!profile.currentStore
  }
  return (
    <ProfileWatchingWrapper
      validator={validator}
      WrappedComponentClass={WrappedComponentClass}
      accessDeniedComponent={accessDeniedPage}
    />
  )
}

export default decorator
