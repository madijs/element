import React, { useState, useEffect } from "react"
import { Card } from "semantic-ui-react"
import { achievementsApi } from "../config/apiUrls"

const config = [
  { points: 0, name: "newbie", text: "Новичок" },
  { points: 400, name: "enthusiast", text: "Энтузиаст" },
  { points: 800, name: "junior", text: "Junior программист" },
  { points: 1200, name: "knower", text: "Знаток года" },
  { points: 1600, name: "beginner", text: "Начинающий программист" },
  { points: 2000, name: "middle", text: "Middle программист" },
  { points: 2800, name: "master", text: "Мастер кода" },
  { points: 3500, name: "senior", text: "Senior программист" },
  { points: 3800, name: "guru", text: "Гуру Element" },
]

const RoadMap = (props) => {
  const {
    points,
    achievements,
    myAchievements,
    setAchievements,
    setMyAchievements,
  } = props
  return (
    <>
      <Card fluid>
        <Card.Content>
          <div
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: "29,26px",
                  color: "#02002b",
                }}
              >
                Мои достижения
              </div>
            </div>
            <div style={{ marginLeft: 40, marginRight: 40, marginTop: 30 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "#02002B",
                }}
              >
                <div>
                  <b>{points}</b> терабаксов
                </div>
                <div>
                  <b>
                    {config.filter((q) => q.points > points)
                      ? config.find((q) => q.points > points).points
                      : points}
                  </b>{" "}
                  терабаксов
                </div>
              </div>
              <div style={{ width: "100%", marginTop: 8 }}>
                <div
                  style={{
                    width: "100%",
                    border: "2px solid #c2cfe0",
                    borderRadius: 4,
                  }}
                ></div>
                <div
                  style={{
                    width:
                      (points
                        ? config.filter((q) => q.points > points)
                          ? parseInt(
                              100 *
                                (points /
                                  config.find((q) => q.points > points).points),
                            )
                          : 100
                        : 0) + "%",
                    border: "4px solid #005cff",
                    borderRadius: 4,
                    marginTop: -6,
                  }}
                ></div>
              </div>
              <div style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
                {false &&
                  config.map((q, i) => (
                    <>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent:
                            "flex-" + (i % 2 === 1 ? "end" : "start"),
                          opacity: q.points > points ? 0.5 : 1,
                        }}
                      >
                        <div
                          style={{
                            width: 110,
                            height: 110,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <img
                            src={"./assets/img/roadmap/" + q.name + ".png"}
                          />
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#02002b",
                              lineHeight: "19,5px",
                              marginTop: 8,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {q.text}
                            {q.points < points ? (
                              <>
                                <img
                                  src={"./assets/img/roadmap/check.png"}
                                  style={{ marginLeft: 8 }}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                {achievements.map((q, i) => (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent:
                          "flex-" + (i % 2 === 1 ? "end" : "start"),
                        opacity: myAchievements.filter((w, j) => w.id === q.id)
                          .length
                          ? 1
                          : 0.5,
                      }}
                    >
                      <div
                        style={{
                          width: 110,
                          height: 110,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={q.image}
                          style={{ height: 80, width: 80, borderRadius: 40 }}
                        />
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#02002b",
                            lineHeight: "19,5px",
                            marginTop: 8,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {q.title}
                          {myAchievements.filter((w, j) => w.id === q.id)
                            .length > 0 ? (
                            <>
                              <img
                                src={"./assets/img/roadmap/check.png"}
                                style={{ marginLeft: 8 }}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </>
  )
}

export default RoadMap
