import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import RegistrationFirstStep from "../components/RegistrationFirstStep"
import RegistrationSecondStep from "../components/RegistrationSecondStep"
import RegistrationThirdStep from "../components/RegistrationThirdStep"
import NotFoundPage from "./NotFoundPage"
import { apiPost } from "../utils/apiConnector"
import { triggerApi } from "../config/apiUrls"
import { useHistory } from "react-router-dom"
import AuthorizationComponent from "../components/AuthorizationComponent"

const RegistrationPage = (props) => {
  const history = useHistory()
  const href = window.location.href.split("/")
  const query = href[href.length - 1].split("?")
  const keyBody = query[query.length - 1].split("=")
  let key = undefined
  if (keyBody.length > 1) {
    key = keyBody[1]
  }
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(0)
  const trigger = () => {
    setIsLoading(true)
    apiPost(triggerApi, { email })
      .onStatus(
        () => {
          setStep(1)
        },
        200,
        202,
      )
      .onFail(() => {})
      .afterAll(() => {
        setIsLoading(false)
      })
      .startSingle()
  }
  const steps = [
    <RegistrationFirstStep
      email={email}
      setEmail={setEmail}
      submit={trigger}
      history={history}
    />,
    <RegistrationSecondStep email={email} trigger={trigger} />,
    <RegistrationThirdStep
      history={history}
      kkey={key}
      setIsLoading={setIsLoading}
    />,
  ]
  const profile = useSelector((state) => state.profile)
  useEffect(() => {
    if (key) {
      setStep(2)
    }
  }, [])
  if (profile.signedIn) return <NotFoundPage />
  return (
    <>
      <AuthorizationComponent
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        step={step}
        setStep={setStep}
        steps={steps}
        history={history}
        page={true}
      />
    </>
  )
}

export default RegistrationPage
