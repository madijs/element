import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Input, Button } from "semantic-ui-react"
import { purchasesApi, productsApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import { NotificationManager } from "react-notifications"

const GiftShopPage = (props) => {
  const [gifts, setGifts] = useState([])
  const getGifts = () => {
    apiGet(productsApi, {})
      .onStatus((res) => {
        setGifts(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getGifts()
    return () => {}
  }, [])
  return (
    <>
      <div>
        <div style={{ marginLeft: 80, marginTop: 90 }}>
          <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
            Подарки
          </p>
        </div>
        <div style={{ marginRight: 80, marginLeft: 80 }}>
          <div style={{ marginTop: 5 }}>
            {gifts.map((q, i) => (
              <>
                <div
                  style={{
                    width: 224,
                    height: 297,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
                    display: "inline-block",
                    marginRight: 20,
                    marginTop: 30,
                  }}
                >
                  <div
                    style={{
                      height: 140,
                      width: "100%",
                      backgroundColor: "#c2cfe0",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <img
                      src={q.image}
                      style={{
                        height: 140,
                        width: "100%",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: 157,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#00aaf4",
                        }}
                      >
                        {q.title}
                      </p>
                      <div
                        style={{
                          overflowY: "hidden",
                          marginTop: -13,
                          height: 60,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: 12,
                            color: "#2c3854",
                            overflowY: "hidden",
                          }}
                        >
                          {q.description}
                        </p>
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#00aaf4",
                          marginTop: -15,
                        }}
                      >
                        <p>{q.bonus_price}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Button
                          fluid
                          content={"Приобрести"}
                          style={{
                            backgroundColor: "#00aaf4",
                            borderRadius: 8,
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                          onClick={() => {
                            apiPost(purchasesApi, { product: q.id })
                              .onStatus(
                                (res) => {
                                  if (res.status === 403) {
                                    NotificationManager.error("Error message", res.data.detail, 1000)
                                  }
                                  console.log(res)
                                },
                                200,
                                201,
                                203,
                                204,
                                400,
                                401,
                                403,
                              )
                              .onFail(() => {})
                              .afterAll(() => {})
                              .startSingle()
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GiftShopPage
