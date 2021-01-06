import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Input, Button } from "semantic-ui-react"
import { register } from "../ducks/profile"

const RegistrationThirdStep = (props) => {
  const { history, kkey, setIsLoading } = props
  const [pass, setPass] = useState("")
  const [secondPass, setSecondPass] = useState("")
  const dispatch = useDispatch()
  const onRegister = (data) => {
    dispatch(register(data, history))
  }
  return (
    <>
      <div style={{ height: "80%", marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            alignItems: "flex-start",
            height: "70%",
          }}
        >
          {/*
          <div style={{ display: "none" }}>
            <Input
              type="email"
              placeholder="Email"
              style={{
                width: 290,
                border: "0px solid red",
                backgroundColor: "#eeeeee",
                height: 35,
                color: "black",
              }}
            />
          </div>
          <div style={{ display: "none" }}>
            <Input
              placeholder="Логин"
              style={{
                width: 290,
                border: "0px solid red",
                backgroundColor: "#eeeeee",
                height: 35,
                color: "black",
              }}
            />
          </div>
          */}
          <div style={{}}>
            <span style={{ color: "#02002b" }}>Пароль</span>
            <Input
              type="password"
              placeholder="Пароль"
              error={pass && pass.length < 8}
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
              style={{
                width: 400,
                backgroundColor: "#ffffff",
                border: "2px solid #b2d9f2",
                height: 48,
                color: "black",
                borderRadius: 8,
              }}
              value={pass}
              onChange={(e, d) => {
                setPass(d.value)
              }}
            />
          </div>
          <div style={{ marginTop: 25 }}>
            <span style={{ color: "#02002b" }}>Повторите пароль</span>
            <Input
              type="password"
              placeholder="Повторите пароль"
              disabled={!pass}
              error={pass && pass !== secondPass}
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
              style={{
                width: 400,
                backgroundColor: "#ffffff",
                border: "2px solid #b2d9f2",
                height: 48,
                color: "black",
                borderRadius: 8,
              }}
              value={secondPass}
              onChange={(e, d) => {
                setSecondPass(d.value)
              }}
            />
            <span style={{ color: "#02002b" }}>
              Минимальная длина пароля 8 символов
            </span>
          </div>
          <div style={{ marginTop: 50 }}>
            <Button
              style={{
                backgroundColor: "#0055ff",
                color: "white",
                height: 50,
                width: 400,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "100",
                border: "0px solid red",
                borderRadius: 16,
              }}
              onClick={() => {
                const mac_address = "00-00-00-00-00-00"
                onRegister({ password: pass, mac_address, key: kkey })
                setIsLoading(true)
              }}
            >
              <p style={{ fontSize: 13 }}>Создать аккаунт</p>
            </Button>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </>
  )
}

export default RegistrationThirdStep
