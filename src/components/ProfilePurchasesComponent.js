import React, { useState, useEffect, useRef } from "react"
import { Button, Input } from "semantic-ui-react"
import { purchasesApi } from "../config/apiUrls"
import { apiGet } from "../utils/apiConnector"

const ProfilePurchasesComponent = (props) => {
  const [purchases, setPurchases] = useState([])
  const getPurchases = () => {
    apiGet(purchasesApi, {})
      .onStatus((res) => {
        console.log(res.data.results)
        setPurchases(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    getPurchases()
    return () => {}
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}

export default ProfilePurchasesComponent
