import React, { useEffect, useState } from "react"
import { productsApi, purchasesApi } from "../config/apiUrls"
import { apiGet, apiPost } from "../utils/apiConnector"
import styles from "../components/styles/GiftShopPage.module.css"
import info from "../assets/img/giftShopPageInfo.png"
import { NotificationManager } from "react-notifications"

const GiftShopPage = (props) => {
  const [gifts, setGifts] = useState([])
  const [activeSort,setActiveSort] = useState("new")
  const getGifts = () => {
    apiGet(productsApi, {})
      .onStatus((res) => {
        setGifts(res.data.results)
      }, 200)
      .onFail(() => {
      })
      .afterAll(() => {
      })
      .startSingle()
  }
  useEffect(() => {
    getGifts()
    return () => {
    }
  }, [])

  const sort = (type) => {
    switch (type) {
      case "new": {
        const copyState = [...gifts]
        let newGifts = copyState.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at)) ? 1 : ((new Date(b.created_at) > new Date(a.created_at)) ? -1 : 0))
        setGifts(newGifts)
        setActiveSort("new")
        break
      }
      case "cheap": {
        const copyState = [...gifts]
        let newGifts = copyState.sort((a, b) => (a.bonus_price > b.bonus_price) ? 1 : ((b.bonus_price > a.bonus_price) ? -1 : 0))
        setGifts(newGifts)
        setActiveSort("cheap")
        break
      }
      case "expensive": {
        const copyState = [...gifts]
        let newGifts = copyState.sort((a, b) => (a.bonus_price < b.bonus_price) ? 1 : ((b.bonus_price < a.bonus_price) ? -1 : 0))
        setGifts(newGifts)
        setActiveSort("expensive")
        break
      }
      default:
        setGifts(gifts)
        break;
    }
  }


  return (
    <>
      <div>
        <div style={{ marginLeft: 80, marginTop: 90,display:"flex",justifyContent:"space-between"}}>
          <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
            Магазин Подарков
          </p>
          <div className={styles.sort}>
            <a onClick={()=>sort("new")} style={activeSort === "new" ? {color:"black"} : {}}>Сначала новые</a>
            <a onClick={()=>sort("cheap")} style={activeSort === "cheap" ? {color:"black"} : {}}>Сначала дешевые</a>
            <a onClick={()=>sort("expensive")} style={activeSort === "expensive" ? {color:"black"} : {}}>Сначала дорогие</a>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <h2>Магазин подарков -</h2>
            <p>это то место, где ты сможешь купить вещи и многое другое за <span>Терабаксы</span>, которые получил за
              успешное прохождение курсов</p>
            <p><span>Терабаксы</span> можно получить как бонусы за хорошую успеваемость и активность на уроке. И так
              далее и тому подобное</p>
          </div>
          <img src={info} alt="info" />

        </div>
        <div className={styles.giftsContainer}>
          {gifts.map((gift, i) => (
            <div className={styles.gift} key={i}>
              <img src={gift.image} alt={gift.title} />
              <h3>{gift.title}</h3>
              <p>{gift.description}</p>
              <span>{gift.bonus_price} терабаксов</span>
              <button
                onClick={() => {
                  apiPost(purchasesApi, { product: gift.id })
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
                    .onFail(() => {
                    })
                    .afterAll(() => {
                    })
                    .startSingle()
                }}
              >Купить
              </button>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default GiftShopPage
