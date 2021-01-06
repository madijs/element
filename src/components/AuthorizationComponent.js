import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import {
  Button,
  Card,
  Dropdown,
  Menu,
  Input,
  Icon,
  Dimmer,
  Loader,
  Label,
} from "semantic-ui-react"

const AuthorizationComponent = (props) => {
  const {
    history,
    isLoading,
    email,
    pass,
    setEmail,
    setPass,
    handleSubmit,
    page,
    step,
    steps,
  } = props
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }
  const responseGoogle = (response) => {
    console.log(response)
  }
  const componentClicked = (e) => {
    e.preventDefault()
  }
  const responseFacebook = (response) => {
    console.log(response)
  }
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
        }}
      >
        <Dimmer active={isLoading}>
          <Loader />
        </Dimmer>
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
                      cursor: "pointer",
                      textDecoration: page ? "underline" : "none",
                    }}
                    onClick={() => {
                      history.push("/registration")
                    }}
                  >
                    Регистрация
                  </a>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <a
                    style={{
                      fontSize: 21,
                      color: !page ? "#2c3854" : "#86a1bf",
                      cursor: "pointer",
                      textDecoration: !page ? "underline" : "none",
                    }}
                    onClick={() => {
                      history.push("/")
                    }}
                  >
                    Войти
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
                      <Input
                        type="password"
                        icon={
                          <i
                            class="icon"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src="./assets/img/authorization/lock-blue.png" />
                          </i>
                        }
                        iconPosition="left"
                        placeholder={"Пароль"}
                        style={{
                          width: 400,
                          border: "2px solid #b2d9f2",
                          backgroundColor: "#ffffff",
                          height: 48,
                          color: "black",
                          borderRadius: 8,
                        }}
                        onChange={(e, d) => {
                          setPass(e.target.value)
                        }}
                        onKeyDown={handleKeypress}
                        value={pass}
                        // label={<Label />}
                        // labelPosition="right"
                      />
                    </div>
                    <p
                      onClick={()=>history.push("/forgotPassword")}
                      style={{ fontSize: 13, float: "right", color: "#86a1bf", cursor:"pointer" }}
                    >
                      Забыли пароль?{" "}
                    </p>
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
                        <p style={{ fontSize: 13 }}>Войти в систему</p>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <div
                style={{
                  marginTop: 40,
                  display: step === 1 || step === 2 ? "none" : "block",
                }}
              >
                <p style={{}}>или присойденяйся к нам с помощью</p>
                <GoogleLogin
                  clientId="697746498664-qine7l32enmr6s5qd6umfja5r7fle95k.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                {/*<FacebookLogin*/}
                {/*  appId="250558253163937"*/}
                {/*  autoLoad={true}*/}
                {/*  fields="name,email,picture"*/}
                {/*  onClick={()=>componentClicked}*/}
                {/*  callback={responseFacebook} />*/}
                {/*<FacebookLogin*/}
                {/*  appId="1088597931155576"*/}
                {/*  autoLoad={true}*/}
                {/*  fields="name,email,picture"*/}
                {/*  onClick={componentClicked}*/}
                {/*  callback={responseFacebook} />*/}
                {/*<img*/}
                {/*  src="./assets/img/authorization/google.png"*/}
                {/*  style={{ cursor: "pointer" }}*/}
                {/*/>*/}
                {/*<img*/}
                {/*  src="./assets/img/authorization/facebook.png"*/}
                {/*  style={{ cursor: "pointer" }}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorizationComponent
