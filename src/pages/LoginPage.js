import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { signIn } from "../ducks/profile"
import { isEmpty } from "ramda"
import { useHistory } from "react-router-dom"
import AuthorizationComponent from "../components/AuthorizationComponent"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  const onSignIn = (...data) => {
    dispatch(signIn(...data))
  }
  useEffect(() => {}, [])

  const signInCallback = () => {
    setIsLoading(false)
  }

  const handleSubmit = () => {
    if (isLoading) return

    const emailError = isEmpty(email)
    const passError = isEmpty(pass)
    setPassError(passError)
    setEmailError(emailError)

    if ((emailError, passError)) return

    setIsLoading(true)
    onSignIn(email, pass, signInCallback)
  }

  return (
    <>
      <AuthorizationComponent
        history={history}
        isLoading={isLoading}
        email={email}
        pass={pass}
        setEmail={setEmail}
        setPass={setPass}
        handleSubmit={handleSubmit}
        page={false}
      />
    </>
  )
}

export default LoginPage
