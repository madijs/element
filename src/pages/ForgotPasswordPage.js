import { Button, Dimmer, Input, Loader } from "semantic-ui-react"
import GoogleLogin from "react-google-login"
import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { forgotPasswordAction } from "../actions/forgotPasswordAction"


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page] = useState(false)
  const [email, setEmail] = useState("")
  const [steps,setSteps] = useState('');
  const [step,setStep] = useState('')


  const handleSubmit = () => {
    dispatch(forgotPasswordAction(email))
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return(
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "50%",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              zIndex: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                page
                  ? "./assets/img/regist-pic.png"
                  : "./assets/img/login-pic.png"
              }
              style={{ width: "70%" }}
            />
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <img
              src="./assets/img/logo.svg"
              style={{
                position: "absolute",
                left: 100,
                top: 40,
                height: 55,
                width: 230,
              }}
            />
            <div style={{ position: "absolute", left: 100, bottom: 45 }}>
              {page ? "Уже есть аккаунт? " : "Ещё нет аккаунта? "}
              <a
                style={{ fontWeight: 200, cursor: "pointer" }}
                onClick={() => {
                  if (page) {
                    history.push("/")
                  } else {
                    history.push("/registration")
                  }
                }}
              >
                {page ? "Войти в систему" : "Зарегистрироваться"}
              </a>
            </div>
          </div>
        </div>
        <div style={{ width: "50%", height: "100%", backgroundColor: "white" }}>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              zIndex: 0,
              display: "flex",
            }}
          >
            <img src="./assets/img/right-side.png" style={{ height: "100%" }} />
            <div
              style={{
                height: "100%",
                backgroundColor: "#f0fcff",
                width: "100%",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "65%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                maxWidth: 400,
              }}
            >
              <div
                style={{
                  display: step !== 1 ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <a
                    style={{
                      fontSize: 21,
                      color: page ? "#2c3854" : "#86a1bf",
                      textDecoration: "underline",
                    }}
                  >
                    Восстановление пароля
                  </a>
                </div>
              </div>
              {page ? (
                <>{steps[step]}</>
              ) : (
                <>
                  <div style={{ height: "100%" }}>
                    <div style={{ marginTop: 45 }}>
                      <Input
                        type="email"
                        icon={
                          <i
                            class="icon"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src="./assets/img/authorization/email-blue.png" />
                          </i>
                        }
                        iconPosition="left"
                        placeholder={"Email"}
                        style={{
                          width: 400,
                          backgroundColor: "#ffffff",
                          border: "2px solid #b2d9f2",
                          height: 48,
                          color: "black",
                          borderRadius: 8,
                        }}
                        onChange={(e, d) => {
                          setEmail(d.value)
                        }}
                        onKeyDown={handleKeypress}
                        value={email}
                      />
                    </div>
                    <div style={{ marginTop: 40 }}>
                      <Button
                        style={{
                          backgroundColor: "#0055ff",
                          color: "white",
                          height: 48,
                          width: 400,
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "100",
                          borderRadius: 16,
                        }}
                        onClick={handleSubmit}
                      >
                        <p style={{ fontSize: 13 }}>Восстановить пароль</p>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ForgotPassword