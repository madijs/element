import React, { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Icon } from "semantic-ui-react"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const example =
  "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf"

const Presentation = (props) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [oldPosition, setOldPosition] = useState(1)
  const {
    width,
    height,
    top,
    left,
    position,
    setPosition,
    socket,
    profile,
    url,
    control,
  } = props

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  useEffect(() => {
    const scrl = document.getElementById("ScrollDiv")
    if (scrl) {
      if (position.position !== oldPosition) {
        scrl.scrollTop = position.position
        setOldPosition(position.position)
      }
    }
    return () => {}
  })
  return (
    <>
      <div
        id={"ScrollDiv"}
        style={{
          width: width,
          height: height - 48,
          backgroundColor: "#dddddd",
          position: "absolute",
          left: left,
          top: top + 48,
          boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll",
          paddingTop: 300,
        }}
        scrollTop={position.position}
        onScroll={(e) => {
          setPosition({ page: position.page, position: e.target.scrollTop })
          if (profile.elementProfile) {
            if (profile.elementProfile.type === 1 || control) {
              socket.socket.send(
                JSON.stringify({
                  event: {
                    type: "presentation",
                    page: position.page,
                    position: e.target.scrollTop,
                  },
                }),
              )
            }
          }
        }}
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(er) => console.log(er.message)}
        >
          <Page pageNumber={position.page} width={500} />
        </Document>
        <div
          style={{
            marginTop: -30,
            position: "relative",
            zIndex: 99,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="left arrow"
            onClick={() => {
              if (position.page > 0) {
                if (profile.elementProfile) {
                  if (profile.elementProfile.type === 1 || control) {
                    socket.socket.send(
                      JSON.stringify({
                        event: {
                          type: "presentation",
                          page: position.page - 1,
                          position: 1,
                        },
                      }),
                      setPosition({ page: position.page - 1, position: 1 })
                    )
                  }
                }
                // setPosition({ page: position.page - 1, position: 1 })
                // setPageNumber(pageNumber - 1)
              }
            }}
          />
          <p>
            Страница {position.page} из {numPages}
          </p>
          <Icon
            name="right arrow"
            onClick={() => {
              if (position.page < numPages) {
                if (profile.elementProfile) {
                  if (profile.elementProfile.type === 1 || control) {
                    socket.socket.send(
                      JSON.stringify({
                        event: {
                          type: "presentation",
                          page: position.page + 1,
                          position: 1,
                        },
                      }),
                      setPosition({ page: position.page + 1, position: 1 })
                    )
                  }
                }
                // setPosition({ page: position.page + 1, position: 1 })
                // setPageNumber(position.page + 1)
              }
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: height - 48,
          marginLeft: left,
        }}
      ></div>
    </>
  )
}

export default Presentation
