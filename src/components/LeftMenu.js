import React, { useState } from "react"
import { sidebarMenuItems } from "../config/sidebarMenuItems"
import { withRouter, useHistory, useLocation } from "react-router-dom"

const height = window.innerHeight

const LeftMenu = (props) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const onItemSelected = (name, data) => {
    let toggle = false
    if ("/" + name !== pathname) {
      if (name || name === "") {
        history.push(`/${name}`)
        toggle = true
      } else {
        toggle = true
      }
    }
    if (data) {
      data()
      toggle = true
    }
    if (toggle) {
      if (menuOpened) {
        setMenuOpened(!menuOpened)
        setVisible(!visible)
      }
    }
  }
  return (
    <>
      <div
        style={{
          height: "100%",
          width: menuOpened ? 260 : 70,
          backgroundColor: "white",
          position: "fixed",
          zIndex: 100,
          boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
          transition: ".2s",
          left: 0,
          top: 0,
          display:
            !pathname.includes("courses") && pathname.includes("course")
              ? "none"
              : "block",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            paddingLeft: 15,
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <img
            src="./assets/img/menu/content.png"
            onClick={() => {
              if (visible) {
                setVisible(!visible)
              } else if (!visible) {
                setTimeout(() => {
                  setVisible(!visible)
                }, 200)
              }
              setMenuOpened(!menuOpened)
            }}
          />
          <img
            src="./assets/img/logo.svg"
            style={{
              marginRight: 40,
              transition: ".2s",
              display: visible ? "block" : "none",
            }}
            onClick={() => {
              onItemSelected("")
            }}
          />
        </div>
        {sidebarMenuItems.map((q, i) => {
          if (q.route.path === "profile") {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 52,
                    cursor: "pointer",
                    // color:
                    //   "/" + q.route.path === pathname ? "#ffffff" : "#005cff",
                    fontWeight: 500,
                    // backgroundColor:
                    //   "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                    position: "absolute",
                    //top:
                    //  (746 / 959) * height > 500 ? (746 / 959) * height : 500,
                    bottom: 30,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    // e.target.style.backgroundColor = "#005cff"
                    // e.target.style.color = "#ffffff"
                  }}
                  onMouseLeave={(e) => {
                    // e.target.style.backgroundColor = "#ffffff"
                    // e.target.style.color = "#005cff"
                  }}
                  onClick={() => onItemSelected(q.route.path)}
                >
                  <div
                    style={{
                      marginLeft: 10,
                      backgroundColor:
                        "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                      borderRadius: 16,
                      width: 48,
                      height: 56,
                      boxShadow:
                        "/" + q.route.path === pathname
                          ? "0px 2px 5px rgba(0, 71, 255, 0.5)"
                          : "",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border:
                        "/" + q.route.path === pathname
                          ? "0px solid red"
                          : "2px solid #c2cfe0",
                      borderRight:
                        "/" + q.route.path === pathname || menuOpened
                          ? "0px solid red"
                          : "2px solid #c2cfe0",
                    }}
                  >
                    <img
                      src={`./assets/img/menu/${
                        q.icon +
                        ("/" + q.route.path === pathname ? "_white" : "")
                      }.png`}
                    />
                  </div>
                  <div
                    style={{
                      width: 190,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginLeft: -13,
                      paddingLeft: 23,
                      transition: ".2s",
                      display: visible ? "block" : "none",
                      color:
                        "/" + q.route.path === pathname ? "#ffffff" : "#2c3854",
                      backgroundColor:
                        "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                      borderTopRightRadius: 16,
                      borderBottomRightRadius: 16,
                      boxShadow:
                        "/" + q.route.path === pathname
                          ? "0px 2px 5px rgba(0, 71, 255, 0.5)"
                          : "",
                      border:
                        "/" + q.route.path === pathname
                          ? "0px solid red"
                          : "2px solid #c2cfe0",
                      borderLeft:
                        "/" + q.route.path === pathname || menuOpened
                          ? "0px solid red"
                          : "2px solid #c2cfe0",
                    }}
                  >
                    <p style={{ marginTop: 20, fontWeight: 600 }}>{q.title}</p>
                  </div>
                </div>
              </>
            )
          }
          return (
            <>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  height: 52,
                  cursor: "pointer",
                  //color:
                  //  "/" + q.route.path === pathname ? "#ffffff" : "#005cff",
                  fontWeight: 500,
                  // backgroundColor:
                  //  "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                }}
                onMouseEnter={(e) => {
                  // e.target.style.backgroundColor = "#005cff"
                  // e.target.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  // e.target.style.backgroundColor = "#ffffff"
                  // e.target.style.color = "#005cff"
                }}
                onClick={() => onItemSelected(q.route.path)}
              >
                <div
                  style={{
                    marginLeft: 10,
                    backgroundColor:
                      "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                    borderRadius: 16,
                    width: 48,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 100,
                    boxShadow:
                      "/" + q.route.path === pathname
                        ? "0px 2px 5px rgba(0, 71, 255, 0.5)"
                        : "",
                  }}
                >
                  <img
                    src={`./assets/img/menu/${
                      q.icon + ("/" + q.route.path === pathname ? "_white" : "")
                    }.png`}
                  />
                </div>
                <div
                  style={{
                    width: 190,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginLeft: -13,
                    paddingLeft: 23,
                    transition: ".2s",
                    fontWeight: 500,
                    display: visible ? "block" : "none",
                    color:
                      "/" + q.route.path === pathname ? "#ffffff" : "#005cff",
                    backgroundColor:
                      "/" + q.route.path === pathname ? "#005cff" : "#ffffff",
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    boxShadow:
                      "/" + q.route.path === pathname
                        ? "0px 2px 5px rgba(0, 71, 255, 0.5)"
                        : "",
                  }}
                >
                  <p style={{ marginTop: 20, fontWeight: 600 }}>{q.title}</p>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default LeftMenu
