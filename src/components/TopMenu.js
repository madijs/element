import React, { useState, useEffect } from "react"
import { Dropdown, Divider } from "semantic-ui-react"
import { useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import i18next from "i18next"
import {
  nearestLessonsApi,
  lessonsApi,
  noTypedLessonsApi,
  achievementsApi,
  myAchievementsApi,
} from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import { Button, Modal } from "semantic-ui-react"
import {
  saveProfileToStorage,
  getElementProfileInformation,
} from "../ducks/profile"
import RoadMap from "./RoadMap"
import { noduxMessages } from "../nodux/noduxMessages"

const TopMenu = (props) => {
  const [lang, setLang] = useState("")
  const [opened, setOpened] = useState(false)
  const [modal, setModal] = useState(false)
  const [myAchievements, setMyAchievements] = useState([])
  const [achievements, setAchievements] = useState([])
  const changeLang = (lang, textLang) => {
    setLang(textLang)
    i18next.changeLanguage(lang, () => {})
    localStorage.setItem("lang", JSON.stringify([lang, textLang]))
  }
  const location = useLocation()
  const { pathname } = location
  const {
    profile,
    onSignOut,
    navigateHome,
    setNotifications,
    ntfctns,
    history,
    cls,
  } = props
  const getNearestLessons = () => {
    const type = profile.profile ? profile.profile.type : -1
    apiGet(nearestLessonsApi, {})
      .onStatus((res) => {
        console.log(res.data.results)
        setNotifications(res.data.results)
        res.data.results.map((q) => ntfctns.push(q))
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const dispatch = useDispatch()
  const onSaveProfileToStorage = () => {
    dispatch(saveProfileToStorage())
  }
  const onGetElementProfileInformation = () => {
    dispatch(getElementProfileInformation(onSaveProfileToStorage))
  }
  const getAchievements = () => {
    apiGet(achievementsApi, {})
      .onStatus((res) => {
        console.log(res.data.results)
        setAchievements(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getMyAchievements = () => {
    apiGet(myAchievementsApi, {})
      .onStatus((res) => {
        console.log(res.data.achievements)
        setMyAchievements(res.data.achievements)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getNearestLessons()
    onGetElementProfileInformation()
    getAchievements()
    getMyAchievements()
    cls.f = setOpened
    return () => {}
  }, [])
  const renderModal = () => {
    return (
      <>
        <Modal
          open={modal}
          onClose={() => {
            setModal(false)
          }}
          style={{ height: "max-content", marginTop: "-40vh", width: 680 }}
          size="mini"
        >
          <RoadMap
            points={profile.elementProfile ? profile.elementProfile.bonuses : 0}
            achievements={achievements}
            myAchievements={myAchievements}
            setAchievements={setAchievements}
            setMyAchievements={setMyAchievements}
          />
        </Modal>
      </>
    )
  }
  const background = (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: 90,
        }}
        onClick={() => {
          setOpened(false)
        }}
      ></div>
    </>
  )
  return (
    <>
      {renderModal()}
      {opened ? background : <></>}
      <div
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 93,
          // boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="./assets/img/logo.svg"
          style={{
            marginLeft:
              !pathname.includes("courses") && pathname.includes("course")
                ? 30
                : 90,
            display: "block",
          }}
          onClick={() => {
            navigateHome()
            noduxMessages.st.f.map((q) => {
              q()
            })
          }}
        />
        <div style={{ display: "flex", marginRight: 30 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 60,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.7
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1
            }}
          >
            <div
              onClick={() => {
                setOpened(!opened)
              }}
            >
              <img
                src="./assets/img/top_menu/notification.png"
                onClick={() => {
                  setOpened(!opened)
                }}
              />
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginTop: -33,
                  marginLeft: 12,
                  display: ntfctns.length ? "block" : "none",
                }}
                onClick={() => {
                  setOpened(!opened)
                }}
              ></div>
            </div>
            <p
              style={{
                color: "#c7d3e3",
                fontWeight: 500,
                fontSize: 16,
                marginLeft: 10,
              }}
              onClick={() => {
                setOpened(!opened)
              }}
            >
              Уведомления ({ntfctns.length})
            </p>
          </div>
          <div
            style={{
              position: "fixed",
              top: 75,
              right: 400,
              width: 320,
              height: 270,
              backgroundColor: "#ffffff",
              display: opened ? "block" : "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
              borderRadius: 5,
              zIndex: 100,
            }}
          >
            <div
              style={{
                backgroundColor: "#d9f4ff",
                width: 320,
                height: 40,
                fontWeight: 500,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              Уведомления ({ntfctns.length})
            </div>
            <div
              style={{
                width: 320,
                height: 230,
                overflowY: "scroll",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
              onClick={() => {}}
            >
              {ntfctns.map((q) => (
                <>
                  <div
                    style={{
                      width: 320,
                      height: profile.profile
                        ? profile.profile.type === 1
                          ? 100
                          : 50
                        : 50,
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    onClick={() => {
                      const type = profile.elementProfile
                        ? profile.elementProfile.type
                        : -1
                      if (type === 0) {
                        history.push("/course/" + q.id)
                      }
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: "#00aaf4",
                        marginLeft: 10,
                      }}
                    >
                      {q.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        style={{
                          borderRadius: 8,
                          width: 180,
                          height: 30,
                          color: "#ffffff",
                          backgroundColor: "#00aaf4",
                          display: profile.profile
                            ? profile.profile.type === 1
                              ? "flex"
                              : "none"
                            : "none",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                        content={"Начать урок"}
                        onClick={() => {
                          console.log(q.id + "11")
                          apiPost(
                            noTypedLessonsApi + "start/?lesson_id=" + q.id,
                            {
                              lesson_id: q.id,
                            },
                          )
                            .onStatus(
                              (res) => {
                                console.log(res)
                                if (res.status === 400 || res.status === 403)
                                  return
                                history.push("/course/" + q.id)
                              },
                              200,
                              201,
                              202,
                              203,
                              204,
                              400,
                            )
                            .onFail(() => {})
                            .afterAll(() => {
                              setOpened(false)
                            })
                            .startSingle()
                        }}
                      />
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#2c3854",
                          marginRight: 30,
                        }}
                      >
                        {q.starts_at
                          ? q.starts_at.split("T").map((q, i) => (
                              <>
                                <span>
                                  {i === 0 ? (
                                    <>
                                      {q
                                        .split("-")
                                        .map((w, j) => {
                                          if (j === 2) {
                                            return w.slice(0, 2) + " "
                                          } else if (j === 1) {
                                            return (
                                              [
                                                "",
                                                "январь",
                                                "февраль",
                                                "март",
                                                "апрель",
                                                "май",
                                                "июнь",
                                                "июль",
                                                "август",
                                                "сентябрь",
                                                "октябрь",
                                                "ноябрь",
                                                "декабрь",
                                              ][parseInt(w)] + " "
                                            )
                                          }
                                          return w + " в "
                                        })
                                        .reverse()}
                                    </>
                                  ) : (
                                    <>
                                      <span>{q}</span>
                                    </>
                                  )}
                                </span>
                              </>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 52,
              cursor: "pointer",
            }}
            onClick={() => {
              setModal(true)
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.7
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1
            }}
          >
            <img src="./assets/img/top_menu/chest.png" />
            <p
              style={{
                color: "#c7d3e3",
                fontWeight: 500,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {profile.elementProfile ? profile.elementProfile.bonuses : ""}{" "}
              тэрабаксов
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: "aliceblue",
                borderRadius: 20,
              }}
            >
              {profile.shwepsProfile ? (
                profile.shwepsProfile.avatar ? (
                  <img
                    src={profile.shwepsProfile.avatar}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "aliceblue",
                    }}
                  />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
            <p
              style={{ marginLeft: 10, marginTop: 10, cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1
              }}
              onClick={() => {
                history.push("/profile")
              }}
            >
              {profile.email}
            </p>
            <Dropdown direction="left">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p
                    style={{}}
                    onClick={() => {
                      history.push("/profile")
                    }}
                  >
                    Личный кабинет
                  </p>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    noduxMessages.st.f.map((q) => {
                      q()
                    })
                    onSignOut()
                  }}
                >
                  Сменить пользователя
                </Dropdown.Item>
                <Divider />
                <Dropdown.Item
                  onClick={() => {
                    noduxMessages.st.f.map((q) => {
                      q()
                    })
                    onSignOut()
                  }}
                >
                  <p style={{ color: "red" }}>Выйти</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopMenu
