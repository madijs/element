import React from "react"
import BasicErrorPage from "./BasicErrorPage"
import { useTranslation } from "react-i18next"

const NotFoundPage = () => {
  const { t } = useTranslation()
  return <BasicErrorPage errorCode={404} errorTitle={"Страница не найдена"} />
}

export default NotFoundPage
