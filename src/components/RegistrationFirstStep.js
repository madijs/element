import React from "react"
import { Button, Checkbox, Input } from "semantic-ui-react"

const RegistrationFirstStep = (props) => {
  const { email, setEmail, submit, history } = props
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
          <div>
            <p style={{ fontSize: 16, color: "#2c3854" }}>
              Введите свою почту и присоединитесь к нам уже сейчас
            </p>
          </div>
          <div style={{ marginTop: 20 }}>
            <span style={{ color: "#02002b" }}>Электронная почта</span>
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
              value={email}
              onChange={(e, d) => {
                setEmail(d.value)
              }}
            />
          </div>
          <div style={{ marginTop: 35 }}>
            <Checkbox style={{ borderRadius: 8 }} />
            <span> Я ознакомлен(а) и согласен(а) с </span>
            <p
              style={{ color: "#385db5" }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline"
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none"
              }}
            >
              Условиями пользовательского соглашения
            </p>
          </div>
          <div style={{ marginTop: 10 }}>
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
              onClick={submit}
            >
              <p style={{ fontSize: 13 }}>Создать аккаунт</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrationFirstStep
