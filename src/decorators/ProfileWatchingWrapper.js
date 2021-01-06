import { omit } from "ramda"
import React from "react"
import { useSelector } from "react-redux"

const ProfileWatchWrapper = (props) => {
  const profile = useSelector((state) => state.profile)
  const { validator, WrapperComponentClass, accessDeniedComponent } = props
  if (validator(profile)) {
    const newProps = omit(
      [
        "profile",
        "validator",
        "WrappedComponentClass",
        "accessDeniedComponent",
      ],
      props,
    )
    return <WrapperComponentClass {...newProps} />
  }
  return accessDeniedComponent
}
