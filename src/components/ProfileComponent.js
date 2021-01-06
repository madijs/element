import React, { useState, useEffect } from "react"
import {
  Input,
  Button,
  Radio,
  Select,
  Dropdown,
  Checkbox,
} from "semantic-ui-react"
import { useHistory } from "react-router-dom"

const ProfileComponent = (props) => {
  const {
    pageState,
    setPageState,
    lastName,
    setLastName,
    name,
    setName,
    birthDate,
    setBirthDate,
    email,
    setEmail,
    phone,
    setPhone,
    countries,
    setCountries,
    country,
    setCountry,
    cities,
    setCities,
    city,
    setCity,
    newPassword,
    setNewPassword,
    oldPassword,
    setOldPassword,
    setProfile,
  } = props
  return (
    <>
      <div>
        <div style={{ display: pageState === 0 ? "block" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Фамилия</div>
              <Input
                style={{
                  width: 232,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={lastName}
                onChange={(e, d) => {
                  setLastName(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Имя</div>
              <Input
                style={{
                  width: 232,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={name}
                onChange={(e, d) => {
                  setName(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Дата рождения
              </div>
              <Input
                style={{
                  width: 155,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="date"
                value={birthDate ? birthDate : ""}
                onChange={(e, d) => {
                  setBirthDate(d.value)
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "none" }}>
              <div style={{ fontSize: 12, color: "#02002b" }}>Класс</div>
              <Input
                style={{
                  width: 76,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="number"
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Электронная почта
              </div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="email"
                value={email}
                onChange={(e, d) => {
                  setEmail(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Телефонный номер
              </div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="tel"
                value={phone}
                onChange={(e, d) => {
                  setPhone(d.value)
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Страна</div>
              <Dropdown
                selection
                options={countries.map((q) => ({
                  key: q.id,
                  value: q.id,
                  text: q.name,
                }))}
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={country}
                onChange={(e, d) => {
                  setCountry(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>Город</div>
              <Dropdown
                selection
                options={cities.map((q) => ({
                  key: q.id,
                  value: q.id,
                  text: q.name,
                }))}
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                value={city}
                onChange={(e, d) => {
                  setCity(d.value)
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Изменить на новый пароль
              </div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="password"
                value={newPassword}
                onChange={(e, d) => {
                  setNewPassword(d.value)
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#02002b" }}>
                Старый пароль
              </div>
              <Input
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  border: "2px solid #B2D9F2",
                }}
                type="password"
                value={oldPassword}
                onChange={(e, d) => {
                  setOldPassword(d.value)
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 70,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Radio />{" "}
            <span style={{ color: "#2c3854", fontSize: 16, fontWeight: 500 }}>
              Разрешить рассылку сообщений и быть в курсе последних новостей
            </span>
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              content="Сохранить данные"
              style={{
                fontWeight: 100,
                width: 690,
                height: 56,
                color: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                borderRadius: 16,
                backgroundColor: "#005cff",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: 16,
                //lineHeight: 20,
              }}
              onClick={setProfile}
            />
          </div>
          <div style={{ height: 100 }}></div>
        </div>
      </div>
    </>
  )
}

export default ProfileComponent
