import React from "react"
import { Button } from "semantic-ui-react"

const mails = ["https://mail.google.com/", "https://mail.ru/"]
const mailsDict = {
  "gmail.com": mails[0],
  "mail.ru": mails[1],
  "list.ru": mails[1],
  "bk.ru": mails[1],
}

const RegistrationSecondStep = (props) => {
  const { email, trigger } = props
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <img src="./assets/img/mail-pic.png" />
          </div>
          <div>
            <b style={{ fontSize: 21, color: "#2c3854" }}>
              Проверте вашу почту
            </b>
          </div>
          <div style={{ marginTop: 15 }}>
            <div>
              <span>
                Мы отправили письмо-подтверждение на{" "}
                <span style={{ color: "#005cff" }}>
                  <b>{email}</b>
                </span>
                .
              </span>
              <span>
                Проверьте Ваш почтовый ящик и подтвердите регистрацию.
              </span>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
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
                const ar = email.split("@")
                const end = ar[1]
                if (end && mailsDict[end]) {
                  window.location.href = mailsDict[end]
                } else {
                  window.location.href = end
                }
              }}
            >
              <p>Перейти на почту</p>
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <span style={{ color: "#a4a8a4" }}>Не получили письмо? </span>
            <a
              style={{ color: "#e75a4d" }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline"
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none"
              }}
              onClick={trigger}
            >
              Отправить еще раз
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}

export default RegistrationSecondStep
