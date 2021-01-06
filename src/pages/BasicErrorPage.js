import React from "react"

const BasicErrorPage = (props) => {
  const { errorCode, errorTitle, description, children } = props
  return (
    <>
      <div style={{ margin: 20 }}>
        <h1>{errorCode}</h1>
        <h2>{errorTitle}</h2>
        <h4>{description}</h4>
        {children}
      </div>
    </>
  )
}

export default BasicErrorPage
