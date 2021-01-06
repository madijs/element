import React, { useState, useEffect } from "react"

const PurchaseStoryComponent = (props) => {
  const { pageState, setPageState } = props
  return (
    <>
      <div>
        <div style={{ display: pageState === 2 ? "block" : "none" }}></div>
      </div>
    </>
  )
}

export default PurchaseStoryComponent
