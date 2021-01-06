import React, { useRef, useEffect, useState } from "react"
import "./styles/whiteBoard.css"
import { apiGet } from "../utils/apiConnector"
import { Dimmer, Loader } from "semantic-ui-react"
import { elementUsersApi, linesApi } from "../config/apiUrls"
import { deleteMinuses } from "../utils/logical"
import { useDispatch, useSelector } from "react-redux"

// const socket = new WebSocket("wss://api.tabula.nalkuatov.kz/ws/1")
let points = []
const pencil = { type: "draw" }
const f = { getPoints: () => {}, canvas: {}, context: {} }
const l = { lessonId: null }
const tt = { t: "" }

const WhiteBoard = (props) => {
  const {
    width,
    left,
    height,
    top,
    socket,
    lessonId,
    drawLine,
    canvasRef,
    brushRef,
    control,
    ctrl,
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [currentColor, setCurrentColor] = useState("black")
  const [palleteOpened, setPalleteOpened] = useState(false)
  const [pcl, setPcl] = useState("draw")
  const { profile } = useSelector((state) => ({ profile: state.profile }))
  l.lessonId = lessonId
  useEffect(() => {
    const getPoints = () => {
      if (!l.lessonId) return
      const request = new XMLHttpRequest()
      request.open("GET", linesApi + deleteMinuses(l.lessonId) + "/", true)
      request.send(null)
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          const res = JSON.parse(request.responseText)
          const lines = res.lines
          lines.map((q) => {
            const p = q.points
            let old = p[0]
            p.map((w, i) => {
              if (i === 0) return
              drawLine(
                context,
                canvas,
                brush,
                old.x,
                old.y,
                w.x,
                w.y,
                q.color,
                q.brushSize,
              )
              old = w
            })
          })
        }
      }
      setIsLoading(true)
      /*
      apiGet(linesApi + deleteMinuses(l.lessonId) + "/", {})
        .onStatus(
          (res) => {
            console.log(res)
            if (res.status === 200) {
              const lines = res.data.lines
              lines.map((q) => {
                const p = q.points
                let old = p[0]
                p.map((w, i) => {
                  if (i === 0) return
                  drawLine(
                    context,
                    canvas,
                    brush,
                    old.x,
                    old.y,
                    w.x,
                    w.y,
                    q.color,
                    q.brushSize,
                  )
                  old = w
                })
              })
            }
          },
          200,
          400,
          500,
        )
        .onFail(() => {})
        .afterAll(() => {
          setIsLoading(false)
        })
        .startSingle()*/
    }
    getPoints()
    f.getPoints = getPoints
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    f.canvas = canvas
    f.context = context
    const colors = document.getElementsByClassName("color")
    const brush = brushRef.current
    const current = {
      color: "black",
    }
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1]
      setCurrentColor(e.target.className.split(" ")[1])
    }
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false)
    }
    let drawing = false
    const drawPoint = (x, y, color, bSize) => {
      const brushSize = bSize ? bSize : brush.value ? parseInt(brush.value) : 2
      context.fillRect(x - bSize / 2 - left, y - bSize / 2 - top, bSize, bSize)
      context.strokeStyle = color
    }
    const send = (color, brushSize) => {
      if (profile.elementProfile) {
        if (profile.elementProfile.type === 1 || ctrl.data) {
          if (pencil.type === "clear") {
            context.clearRect(0, 0, canvas.width, canvas.height)
            getPoints()
          } else if (pencil.type === "text") {
            const text = "111"
            if (points.length) {
              let old = points[0]
              context.fillText(
                text,
                old.x - brushSize / 2 - left,
                old.y - brushSize / 2 - top,
              )
              socket.socket.send(
                JSON.stringify({
                  event: {
                    type: pencil.type,
                    points,
                    color,
                    brushSize,
                    text,
                  },
                }),
              )
            }
          } else {
            socket.socket.send(
              JSON.stringify({
                event: {
                  type: pencil.type,
                  points,
                  color,
                  brushSize,
                },
              }),
            )
            if (pencil.type === "erase") {
              context.clearRect(0, 0, canvas.width, canvas.height)
              getPoints()
            }
          }
        }
      }
    }
    const onMouseDown = (e) => {
      drawing = true
      current.x = e.pageX || e.touches[0].pageX
      current.y = e.pageY || e.touches[0].pageY
    }

    const onMouseMove = (e) => {
      if (!drawing) {
        return
      }
      points.push({
        x: e.pageX || e.touches[0].pageX,
        y: e.pageY || e.touches[0].pageY,
      })
      if (profile.elementProfile) {
        if (
          (profile.elementProfile.type === 1 || ctrl.data) &&
          pencil.type === "draw"
        ) {
          drawLine(
            context,
            canvas,
            brush,
            current.x,
            current.y,
            e.pageX || e.touches[0].pageX,
            e.pageY || e.touches[0].pageY,
            current.color,
            undefined,
            true,
          )
        }
      }
      current.x = e.pageX || e.touches[0].pageX
      current.y = e.pageY || e.touches[0].pageY
    }

    const onMouseUp = (e) => {
      if (!drawing) {
        return
      }
      let oldPoint = points[0]
      drawing = false
      const brushSize = brush.value ? parseInt(brush.value) : 2
      send(current.color, brushSize)
      points = []
    }
    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime()
      return function () {
        const time = new Date().getTime()

        if (time - previousCall >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }
    canvas.addEventListener("mousedown", onMouseDown, false)
    canvas.addEventListener("mouseup", onMouseUp, false)
    canvas.addEventListener("mouseout", onMouseUp, false)
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false)
    canvas.addEventListener("touchstart", onMouseDown, false)
    canvas.addEventListener("touchend", onMouseUp, false)
    canvas.addEventListener("touchcancel", onMouseUp, false)
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false)
    const onResize = () => {
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", onResize, false)
    onResize()
    const onDrawingEvent = (data) => {}
  }, [])
  return (
    <div>
      <Dimmer active={false}>
        <Loader />
      </Dimmer>
      <canvas
        ref={canvasRef}
        style={{
          height: height,
          width: width,
          position: "absolute",
          left: left,
          top: top,
          boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.1)",
          backgroundColor: "white",
          borderRadius: 5,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: left + 12,
          top: top + 120,
          width: 48,
          height: 288,
          zIndex: 90,
          backgroundColor: "ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: currentColor,
              borderRadius: 16,
              boxShadow: "0px 0px 5px rgba(0, 71, 255, 0.25)",
            }}
            onClick={() => {
              setPalleteOpened(!palleteOpened)
            }}
          ></div>
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            border:
              (profile.profile.type === 1 || control) && pcl === "draw"
                ? "1px solid #c2cecf"
                : "0px solid #c2cecf",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            pencil.type = "draw"
            setPcl("draw")
          }}
        >
          <img src="./assets/img/whiteboard/pencil.png" />
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            border:
              (profile.profile.type === 1 || control) && pcl === "text"
                ? "1px solid #c2cecf"
                : "0px solid #c2cecf",
          }}
          onClick={() => {
            pencil.type = "text1"
            setPcl("text1")
          }}
        >
          <img src="./assets/img/whiteboard/T.png" />
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            border:
              (profile.profile.type === 1 || control) && pcl === "erase"
                ? "1px solid #c2cecf"
                : "0px solid #c2cecf",
          }}
          onClick={() => {
            pencil.type = "erase"
            setPcl("erase")
          }}
          title="очистить"
        >
          <img src="./assets/img/whiteboard/eraser.png" />
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            if (profile.elementProfile) {
              if (profile.elementProfile.type === 1 || ctrl.data) {
                socket.socket.send(
                  JSON.stringify({
                    event: {
                      type: "clear",
                    },
                  }),
                )
                f.context.clearRect(0, 0, f.canvas.width, f.canvas.height)
                // f.getPoints()
              }
            }
          }}
          title="очистить всё"
        >
          <img src="./assets/img/whiteboard/undo.png" />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: left + 66,
          top: top + 120,
          height: 200,
          width: 32,
          display: palleteOpened ? "flex" : "none",
          alignItems: "center",
          boxShadow: "0px 0px 5px rgba(0, 71, 255, 0.25)",
          borderRadius: 5,
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          className="color black"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
        <div
          className="color red"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
        <div
          className="color green"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
        <div
          className="color blue"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
        <div
          className="color yellow"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
        <div
          className="color hotpink"
          onClick={() => {
            setPalleteOpened(false)
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginTop: height - 98,
          marginLeft: left - 70,
          position: "relative",
          zIndex: -1,
          height: 50,
        }}
      >
        <div
          style={{
            display: "none",
            height: 50,
            width: 120,
            backgroundColor: "Gray",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          }}
        >
          Ширина кисти
          <input type="number" ref={brushRef} style={{ width: 80 }} />
        </div>
        <div
          style={{
            display: "none",
            height: 50,
            width: 70,
            backgroundColor: "Gray",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          }}
          onClick={() => {
            if (profile.elementProfile) {
              if (profile.elementProfile.type === 1 || ctrl.data) {
                socket.socket.send(
                  JSON.stringify({
                    event: {
                      type: "clear",
                    },
                  }),
                )
                f.context.clearRect(0, 0, f.canvas.width, f.canvas.height)
                //  f.getPoints()
              }
            }
          }}
        >
          Очистить
        </div>
      </div>
    </div>
  )
}

export default WhiteBoard
