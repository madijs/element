import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Card, Button } from "semantic-ui-react"
import { apiGet } from "../utils/apiConnector"
import { advertisementApi } from "../config/apiUrls"

const PromoIndexComponent = (props) => {
  const [advertisements, setAddvertisements] = useState([])
  const getAddvertisements = () => {
    apiGet(advertisementApi, {})
      .onStatus((res) => {
        setAddvertisements(res.data.results)
      }, 200)
      .onFail((res) => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getAddvertisements()
    return () => {}
  }, [])
  return (
    <>
      <div>
        <div
          style={{
            overflowX: "scroll",
            display: advertisements.length ? "flex" : "none",
            // display: "flex",
            position: "relative",
            marginLeft: 80,
            top: 40,
            marginRight: 60,
          }}
        >
          {advertisements.map((q, i) => (
            <>
              <div style={{ width: 224, height: 280, marginRight: 20 }}>
                <div>
                  <img
                    src={q.image}
                    style={{
                      width: 224,
                      height: 280,
                      position: "absolute",
                      zIndex: 0,
                      borderRadius: 8,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 224,
                    height: 280,
                    position: "relative",
                    zIndex: 1,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#005cff",
                      }}
                    >
                      {q.title}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#2c3854",
                        marginTop: -25,
                      }}
                    >
                      {q.text}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#00aaf4",
                      }}
                    >
                      {q.promo_text}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#2c3854",
                        marginTop: -10,
                      }}
                    >
                      Присоединились
                    </p>
                    <div style={{ display: "flex", marginTop: -10 }}>
                      {["red", "blue", "yellow", "green", "white"].map((q) => (
                        <>
                          <div
                            style={{
                              backgroundColor: q,
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              marginRight: -10,
                            }}
                          ></div>
                        </>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Button
                        style={{
                          width: 192,
                          height: 33,
                          backgroundColor: "#00aaf4",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 8,
                        }}
                        content={
                          <p style={{ fontWeight: 600, fontSize: 16 }}>
                            {"Подробнее"}
                          </p>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default PromoIndexComponent
