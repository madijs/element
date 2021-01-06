import ProfileWatchingWrapper from "./ProfileWatchingWrapper"
import React from "react"
import { hasEnoughPermissions } from "../config/permissions"
import BasicErrorPage from "../pages/BasicErrorPage"
import store from "../store/store"
import { showMessage, alertTypes } from "../ducks/alerts"

export const authorize = (...requiredPermissions) => (
  WrappedComponentClass,
) => () => {
  const accessDeniedPage = (
    <BasicErrorPage
      errorCode={403}
      errorTitle="Доступ запрещен."
      description={
        "Необходимые для доступа права: " +
        requiredPermissions.map((permission) => permission.name).join(", ")
      }
    />
  )
  const validator = (profile) =>
    hasEnoughPermissions(profile.permissions, requiredPermissions)
  return (
    <ProfileWatchingWrapper
      validator={validator}
      WrappedComponentClass={WrappedComponentClass}
      accessDeniedComponent={accessDeniedPage}
    />
  )
}

export const authorizeAction = (...requiredPermissions) => {
  const decoratorWrapper = (onFail) => (action) => (...data) => {
    if (
      hasEnoughPermissions(
        store.getState().profile.permissions,
        requiredPermissions,
      )
    ) {
      return action(...data)
    } else {
      store.dispatch(showMessage("Ошибка! Доступ запрещен.", alertTypes.error))
      if (onFail) {
        return onFail(...data)
      }
    }
  }
  const decorator = (action) => decoratorWrapper(false)(action)
  decorator.onFail = decoratorWrapper
  return decorator
}
