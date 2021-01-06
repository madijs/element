import React, { useState, useEffect, useRef } from "react"
import Presentation from "../components/Presentation"
import VideoPresentation from "../components/VideoPresentation"
import WhiteBoard from "../components/WhiteBoard"
import Room from "../components/Room"
import { Input } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Icon } from "semantic-ui-react"
import { apiGet, apiPost } from "../utils/apiConnector"
import {
  lessonsApi,
  groupsApi,
  dialoguesApi,
  linesApi,
} from "../config/apiUrls"
import {
  addfMessage,
  setfMessages,
  cleanfMessages,
  setfId,
} from "../ducks/lessonMessages"
import { deleteMinuses } from "../utils/logical"
import SparkMD5 from "spark-md5"
import $ from "jquery"
import { noTypedLessonsApi } from "../config/apiUrls"
import { fileupload } from "blueimp-file-upload"
import LessonEnd from "../components/LessonEnd"
import { useHistory } from "react-router-dom"
import {
  noduxMessages,
  setnMessages,
  addnMessages,
  cleannMessages,
  setnID,
  setnTmpFunction,
  setDownScroll,
  setCloseSocket,
} from "../nodux/noduxMessages"

const left = 58
const top = 131
const width = 884
const height = 507
let lessonId
const socket = { socket: {} }
const playerFunction = { function: (p) => {} }
const msgs = []
const stnts = []
const txt = { text: "" }
const emjs = { emojies: [] }
const ctrs = { data: [] }
const wctrs = { data: [] }
const vcs = { data: [] }
const mediaRecorder = { mediaRecorder: null }
const recordedChunks = []
const dataUploadId = { lessonId: "", data: "", offset: 0 }
const uploading = { data: true }
const ctrl = { data: false }
const crnt = { data: 0 }
const st = { f: [] }
const ct = { ct: 0, paused: false }

const CoursePage = (props) => {
  const history = useHistory()
  const { dispatch } = useDispatch()
  const canvasRef = useRef(null)
  const brushRef = useRef()
  const videoRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [muted, setMuted] = useState(false)
  const [position, setPosition] = useState({ page: 1, position: 1 })
  const { profile, lessonMessages } = useSelector((state) => ({
    profile: state.profile,
    lessonMessages: state.lessonMessages,
  }))
  const type = profile.elementProfile ? profile.elementProfile.type : ""
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [pres, setPres] = useState("")
  const [press, setPress] = useState([])
  const [videos, setVideos] = useState([])
  const [video, setVideo] = useState("")
  const [lesson, setLesson] = useState(null)
  const [students, setStudents] = useState([])
  const [control, setControl] = useState("")
  const [whantsControl, setWhantsControl] = useState("")
  const [voice, setVoice] = useState("")
  const [emojies, setEmojies] = useState([])
  const [openEmojies, setOpenEmojies] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [isOnAudio, setIsOnAudio] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadId, setUploadId] = useState("")
  const [modal, setModal] = useState(false)
  const [hf, setHf] = useState(null)
  const hiddenFileInput = useRef(null)
  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    setHf(fileUploaded)
  }
  const [tmp, setTmp] = useState(0)
  const drawLine = (
    context,
    canvas,
    brush,
    x0,
    y0,
    x1,
    y1,
    color,
    bSize,
    emit,
  ) => {
    const brushSize = bSize ? bSize : brush.value ? parseInt(brush.value) : 2
    const w = canvas.width
    const h = canvas.height
    context.beginPath()
    context.moveTo(x0 - left, y0 - top)
    context.lineTo(x1 - left, y1 - top)
    context.strokeStyle = color
    context.lineWidth = brushSize
    context.stroke()
    context.closePath()
    setTmp(tmp + 1)
    if (!emit) {
      return
    }
  }
  const onAddMessage = (message) => {
    dispatch(addfMessage(message))
  }
  const onSetMessages = (ms) => {
    dispatch(setfMessages(ms))
  }
  const onSetId = (id) => {
    dispatch(setfId(id))
  }
  const onCleanMessages = () => {
    dispatch(cleanfMessages())
  }
  const callback = () => {
    setIsLoading(false)
  }
  const handleDataAvailable = (event) => {
    if (!uploading.data) return //1
    let blob = event.data
    recordedChunks.push(event.data) //1
    return
    let formData = new FormData()
    formData.append("the_file", blob, "blob.webm")
    if (dataUploadId.data && dataUploadId.lessonId === lessonId) {
      formData.append("upload_id", dataUploadId.data)
    }
    if (event.data.size > 0) {
      recordedChunks.push(event.data)
      apiPost(noTypedLessonsApi + lessonId + "/chunked_upload/", formData)
        .onStatus(
          (res) => {
            // setUploadId(res.data.upload_id)
            if (res.data.upload_id) {
              dataUploadId.data = res.data.upload_id
            }
          },
          200,
          201,
          202,
          203,
          204,
          400,
        )
        .onFail(() => {})
        .afterAll(() => {})
        .startSingle()
      recordedChunks.push(event.data)
    }
  }
  const uploadData = () => {
    let blob = new Blob(recordedChunks, { type: "video/mp4" })
    const data = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = data
    link.download = "blob.mp4"
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    )
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data)
      link.remove()
      socket.socket.close()
      st.f.map((q) => {
        q()
      })
      history.push("/")
    }, 100)
    return //1
    const spark = new SparkMD5.ArrayBuffer()
    recordedChunks.map((q) => {
      spark.append(q)
    })
    const file = new File(recordedChunks, "stream.webm")
    const md5 = spark.end()
    let formData = new FormData()
    formData.append("upload_id", dataUploadId.data)
    formData.append("md5", md5)
    if (md5 && dataUploadId.data && uploading.data) {
      apiPost(
        noTypedLessonsApi + lessonId + "/chunked_upload_complete/",
        formData,
      )
        .onStatus((res) => {}, 200, 201, 202, 203, 204, 400)
        .onFail(() => {})
        .afterAll(() => {
          uploading.data = false
        })
        .startSingle()
    }
  }
  const uploadStream = () => {
    mediaRecorder.mediaRecorder.stop()
    let blob = new Blob(recordedChunks, {
      type: "video/webm",
    })
    apiPost(noTypedLessonsApi + lessonId + "/chunked_upload/", {
      //upload_id: data.result.upload_id,
      md5: md5,
    })
      .onStatus((res) => {}, 200, 201, 202, 203, 204)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
    // document.getElementById("uploadfile").files = [blob]
    //$("#uploadfile").data.files.push(blob)
    // return
    let md5 = ""
    let formData = []
    const calculateMd5 = (file, chunkSize) => {
      let slice =
          File.prototype.slice ||
          File.prototype.mozSlise ||
          File.prototype.webkitSlice,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer()
      const onload = (e) => {
        spark.append(e.target.result)
        currentChunk += 1
        if (currentChunk < chunks) {
          readNextChunk()
        } else {
          md5 = spark.end()
        }
      }
      const readNextChunk = () => {
        const reader = new FileReader()
        reader.onload = onload
        let start = currentChunk * chunkSize,
          end = Math.min(start + chunkSize, file.size)
        reader.readAsArrayBuffer(slice.call(file, start, end))
      }
      readNextChunk()
    }
    $("#uploadfile").fileupload({
      headers: {},
      url: noTypedLessonsApi + lessonId + "/chunked_upload/",
      maxChunkSize: 100000,
      dataType: "json",
      formData: formData,
      add: (e, data) => {
        // $("#messages").empty()
        formData.splice(1)
        calculateMd5(data.files[0], 100000)
        data.submit()
      },
      chunkdone: (e, data) => {
        if (formData.length < 2) {
          formData.push({ name: "upload_id", value: data.result.upload_id })
        }
        // $("#messages").append($("<p>").text(JSON.stringify(data.result)))
        let progress = parseInt((data.loaded / data.total) * 100.0, 10)
        // $("#progress").text(Array(progress).join("=") + "> " + progress + "%")
      },
      done: (e, data) => {
        callback()
        $.ajax({
          type: "POST",
          url: noTypedLessonsApi + lessonId + "/chunked_upload_complete/",
          data: {
            upload_id: data.result.upload_id,
            md5: md5,
          },
          //a0c52b3f-bba3-46e2-be72-8d1861023890
          headers: {},
          dataType: "json",
          success: (data) => {
            // $("#messages").append($("<p>").text(JSON.stringify(data)))
          },
        })
      },
    })
  }
  const downScroll = () => {
    $("#noduxMessages").scrollTop($("#noduxMessages")[0].scrollHeight)
  }
  const getLesson = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    if (!id) return
    apiGet(lessonsApi(type) + id + "/", {})
      .onStatus((res) => {
        const chat_id = res.data.chat_id
        setLesson(res.data)
        getStudents(res.data.group.id)
        if (res.data.topics.length) {
          const prss = res.data.topics[0].presentations
          const vds = res.data.topics[0].videos
          if (prss.length) {
            setPres(prss[0].file)
          }
          if (vds.length) {
            setVideo(vds[0].file)
          }
        }
        apiGet(dialoguesApi, { chat_id })
          .onStatus(
            (res) => {
              if (res.data.results.length) {
                console.log("get_mmm")
                const did = res.data.results[0].id
                setnID(did)
                // onSetId(did)
                console.log("dsadwdd")
                apiGet(dialoguesApi + did + "/", {})
                  .onStatus(
                    (res) => {
                      setDialog(res.data)
                    },
                    200,
                    202,
                    203,
                    201,
                  )
                  .onFail(() => {})
                  .afterAll(() => {})
                  .startSingle()
                console.log("get_messages")
                apiGet(dialoguesApi + did + "/messages/", { dialog_id: did })
                  .onStatus(
                    (res) => {
                      console.log("msg", res)
                      console.log("msgs", res.data.results)
                      res.data.results
                        .slice(0)
                        .reverse()
                        .map((q) => {
                          msgs.push(q)
                        })
                      setnMessages(res.data.results.slice(0).reverse())
                      // sonSetMessages(res.data.results.slice(0).reverse())
                      setTmp(tmp + 1)
                      downScroll()
                    },
                    200,
                    201,
                    202,
                    203,
                  )
                  .onFail(() => {})
                  .afterAll(() => {})
                  .startSingle()
              }
            },
            200,
            201,
            202,
            203,
          )
          .onFail(() => {})
          .afterAll(() => {})
          .startSingle()
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getStudents = (id) => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(groupsApi(type) + id + "/", {})
      .onStatus((res) => {
        if (res.data.students) {
          res.data.students.map((q) => {
            stnts.push(q)
          })
          setStudents(res.data.students)
        }
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  useEffect(() => {
    setCloseSocket(st)
    setnTmpFunction(setTmp)
    setDownScroll(downScroll)
    const href = window.location.href.split("/")
    if (href[5]) {
      lessonId = href[5]
    } else {
      lessonId = ""
    }
    if (!socket.socket.binaryType) {
      socket.socket = lessonId
        ? new WebSocket(
            "wss://api.tabula.elementschool.kz/ws/" +
              deleteMinuses(lessonId) +
              "/",
          )
        : {}
    }
    // socket.socket = new WebSocket("ws://localhost:8081")
    dataUploadId.lessonId = lessonId
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const brush = brushRef.current
    setPosition({ page: 1, position: 1 })
    getLesson(lessonId)
    const getPoints = () => {
      if (!lessonId) return
      const request = new XMLHttpRequest()
      request.open("GET", linesApi + deleteMinuses(lessonId) + "/", true)
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
          setTmp(tmp + 1)
        }
      }
      setIsLoading(true)
      /*
      apiGet(linesApi + deleteMinuses(lessonId), {})
        .onStatus((res) => {
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
        }, 200)
        .onFail(() => {})
        .afterAll(() => {
          setIsLoading(false)
        })
        .startSingle()*/
    }
    socket.socket.onmessage = (event) => {
      const w = canvas.width
      const h = canvas.height
      const obj = JSON.parse(event.data).event
      if (obj.type === "draw") {
        let old = obj.points[0]
        obj.points.map((q, i) => {
          if (i === 0) return
          drawLine(
            context,
            canvas,
            brush,
            old.x,
            old.y,
            q.x,
            q.y,
            obj.color,
            obj.brushSize,
            false,
          )
          old = q
        })
      } else if (obj.type === "text") {
        if (obj.points.length) {
          let old = obj.points[0]
          context.fillText(obj.text, old.x, old.y, 10 * obj.brushSize)
        }
      } else if (obj.type === "clear") {
        context.clearRect(0, 0, canvas.width, canvas.height)
        setTmp(tmp + 1)
      } else if (obj.type === "presentation") {
        setPosition({ page: obj.page, position: obj.position })
      } else if (obj.type === "video-presentation") {
        if (
          obj.player.currentTime - ct.ct < -3 ||
          obj.player.currentTime - ct.ct > 3 ||
          obj.player.paused !== ct.paused
        ) {
          playerFunction.function(obj.player)
          ct.paused = obj.player.paused
          ct.ct = obj.player.currentTime
        }
      } else if (obj.type === "swap") {
        if (obj.current !== crnt.data) {
          crnt.data = obj.current
          setCurrent(obj.current)
        }
      } else if (obj.type === "get_current") {
        if (profile.elementProfile) {
          if (profile.elementProfile.type === 1) {
            socket.socket.send(
              JSON.stringify({
                event: { type: "swap", current: crnt.data },
              }),
            )
          }
        }
      } else if (obj.type === "message") {
        msgs.push({
          first_name: obj.first_name,
          last_name: obj.second_name,
          text: obj.text,
        })
        setMessages([])
      } else if (obj.type === "control") {
        if (profile.profile) {
          if (profile.profile.user_id === obj.user_id) {
            ctrl.data = true
          }
        }
        ctrs.data.push(obj.user_id)
        setControl(obj.user_id)
      } else if (obj.type === "whants_control") {
        if (type === 1) {
          stnts.map((q) => {
            if (q.user.user_id === obj.user_id) {
              wctrs.data.push(q.user.user_id)
              setWhantsControl(q.user.user_id)
            }
          })
        }
      } else if (obj.type === "no_whants_control") {
        if (type === 1) {
          stnts.map((q) => {
            if (q.user.user_id === obj.user_id) {
              const temp = wctrs.data
              wctrs.data = []
              temp.map((w) => {
                if (w !== q.user.user_id) {
                  wctrs.data.push(w)
                }
              })
              setWhantsControl(null)
            }
          })
        }
      } else if (obj.type === "no_control") {
        const t = []
        if (profile.profile) {
          if (profile.profile.user_id === obj.user_id) {
            ctrl.data = false
          }
        }
        for (let i = 0; i < ctrs.data; i++) {
          if (ctrs.data[i] !== obj.user_id) {
            t.push(ctrs.data[i])
          }
        }
        ctrs.data = t
        const y = []
        for (let i = 0; i < wctrs.data; i++) {
          if (wctrs.data[i] !== obj.user_id) {
            y.push(wctrs.data[i])
          }
        }
        wctrs.data = y
        setControl(null)
        setWhantsControl(null)
      } else if (obj.type === "voice") {
        setVoice(obj.user_id)
        vcs.data.push(obj.user_id)
      } else if (obj.type === "no_voice") {
        const t = []
        for (let i = 0; i < vcs.data; i++) {
          if (vcs.data[i] !== obj.user_id) {
            t.push(vcs.data[i])
          }
        }
        vcs.data = t
        setVoice(null)
      } else if (obj.type === "erase") {
        console.log(obj)
        context.clearRect(0, 0, canvas.width, canvas.height)
        getPoints()
        setTmp(tmp + 1)
      } else if (obj.type === "end") {
        socket.socket.close()
        st.f.map((q) => {
          q()
        })
        history.push("/")
      }
    }
    socket.socket.onclose = (event) => {}
    if (profile.elementProfile ? profile.elementProfile.type === 0 : false) {
      setTimeout(() => {
        socket.socket.send(
          JSON.stringify({
            event: { type: "get_current" },
          }),
        )
      }, 300)
    }
    getPoints()
    return () => {}
  }, [])
  const objects = [
    {
      title: "Доска",
      render: (
        <WhiteBoard
          left={left}
          top={top}
          width={width}
          height={height}
          lessonId={lessonId}
          socket={socket}
          drawLine={drawLine}
          brushRef={brushRef}
          canvasRef={canvasRef}
          profile={profile}
          control={
            profile.profile
              ? ctrs.data.filter((q) => q === profile.profile.user_id).length
                ? true
                : false
              : false
          }
          ctrl={ctrl}
        />
      ),
    },
    {
      title: "Презентация",
      render: (
        <Presentation
          left={left}
          top={top}
          width={width}
          height={height}
          lessonId={lessonId}
          socket={socket}
          position={position}
          setPosition={setPosition}
          profile={profile}
          url={pres}
          control={
            profile.profile && 0
              ? ctrs.data.filter((q) => q === profile.profile.user_id).length
              : false
          }
        />
      ),
    },
    {
      title: "Видео-презентация",
      render: (
        <VideoPresentation
          left={left}
          top={top}
          width={width}
          height={height}
          // socket={socket}
          // playerFunction={playerFunction}
          profile={profile}
          // videoRef={videoRef}
          url={video}
          control={
            profile.profile && 0
              ? ctrs.data.filter((q) => q === profile.profile.user_id).length
              : false
          }
        />
      ),
    },
    {
      title: "Share экрана",
      render: (
        <>
          <div
            style={{
              width: width,
              height: height,
              backgroundColor: "lightblue",
              position: "absolute",
              left: left,
              top: top,
              boxShadow: "0 0 2px rgba(0,0,0,0.2)",
            }}
          >
            {lessonId ? (
              <Room
                roomID={deleteMinuses(lessonId) + "share"}
                lessonId={lessonId}
                upload={
                  profile.elementProfile
                    ? profile.elementProfile.type === 1
                    : false
                }
                type={
                  profile.elementProfile
                    ? profile.elementProfile.type === 1
                      ? "user"
                      : "partner"
                    : "partner"
                }
                handleDataAvailable={handleDataAvailable}
                mediaRecorder={mediaRecorder}
                width={width}
                height={height}
                share={true}
                control={
                  profile.profile && 0
                    ? ctrs.data.filter((q) => q === profile.profile.user_id)
                        .length
                    : false
                }
                isOnVideo={
                  profile.elementProfile
                    ? profile.elementProfile.type === 1
                      ? true
                      : true
                    : true
                }
                isOnAudio={
                  profile.elementProfile
                    ? profile.elementProfile.type === 1
                      ? false
                      : true
                    : true
                }
                st={st}
              />
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 250,
              marginLeft: 80,
              height: 50,
            }}
          ></div>
        </>
      ),
    },
  ]
  return (
    <>
      <LessonEnd
        modal={modal}
        setModal={setModal}
        students={students}
        setStudents={setStudents}
        values={students.map((q) => ({
          value: 0,
        }))}
        callback={() => {
          const type = profile.elementProfile ? profile.elementProfile.type : -1
          setModal(false)
          if (type === 1) {
            uploadData()
          } else {
            socket.socket.close()
            st.f.map((q) => {
              q()
            })
            history.push("/")
          }
        }}
      />
      <input type="file" id="uploadfile" hidden />
      <div>
        <div>
          <div
            style={{
              marginLeft: left - 70,
              marginTop: top - 50,
              height: 50,
              width: width + 374,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#334d6e",
                fontWeight: 600,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                socket.socket.close()
                st.f.map((q) => {
                  q()
                })
                history.push("/")
              }}
            >
              <img
                src="./assets/img/course_page/left-arrow.png"
                style={{ marginRight: 8 }}
              />
              НАЗАД К ГЛАВНОЙ
            </div>
            <div
              style={{
                color: "#f22e2e",
                fontWeight: 600,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                const type = profile.elementProfile
                  ? profile.elementProfile.type
                  : -1
                if (type === 1) {
                  setModal(true)
                  socket.socket.send(
                    JSON.stringify({
                      event: { type: "end" },
                    }),
                  )
                } else {
                  socket.socket.close()
                  st.f.map((q) => {
                    q()
                  })
                  history.push("/")
                }
              }}
            >
              ВЫЙТИ С УРОКА
              <img
                src="./assets/img/course_page/exit.png"
                style={{ marginLeft: 8 }}
              />
            </div>
          </div>
          <div
            style={{
              marginLeft: left - 70,
              marginTop: 0,
              width: width,
              height: 48,
              backgroundColor: "#d9f4ff",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border: "0px solid red",
              borderRadius: 4,
              boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
              position: "relative",
              zIndex: type === 1 ? 90 : 0,
            }}
          >
            {type === 1 ? (
              objects.map((q, i) => (
                <>
                  <div
                    style={{
                      width: width / objects.length,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: crnt.data === i ? "#ffffff" : "#00aaf4",
                      backgroundColor: crnt.data === i ? "#00aaf4" : "#d9f4ff",
                      height: 48,
                      border: "0px solid red",
                      borderRadius: 4,
                    }}
                    onMouseEnter={(e) => {
                      const style = e.target.style
                      style.backgroundColor = "#00aaf4"
                      style.color = "#ffffff"
                    }}
                    onMouseLeave={(e) => {
                      const style = e.target.style
                      if (crnt.data === i) return
                      style.backgroundColor = "#d9f4ff"
                      style.color = "#00aaf4"
                    }}
                    onClick={() => {
                      setCurrent(i)
                      crnt.data = i
                      if (type === 1) {
                        socket.socket.send(
                          JSON.stringify({
                            event: { type: "swap", current: i },
                          }),
                        )
                      }
                    }}
                  >
                    {q.title}
                  </div>
                </>
              ))
            ) : (
              <></>
            )}
          </div>
          {objects[crnt.data].render}
          <div
            style={{
              marginLeft: left - 70,
              marginTop: current === 3 ? 180 : 20,
              width: width,
              backgroundColor: "white",
              height: 238,
              boxShadow: "0px 2px 10px rgba(0, 71, 255, 0.1)",
              borderRadius: 5,
            }}
          >
            <div style={{ height: 182 }}>
              <div
                id="noduxMessages"
                style={{ overflowY: "scroll", height: 182 }}
              >
                {noduxMessages.data.map((q) => (
                  <>
                    <div
                      style={{
                        padding: 20,
                        boxShadow: "0px 2px 10px rgba(0, 71, 255, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#00aaf4",
                        }}
                      >
                        {q.from_user.first_name + " " + q.from_user.last_name}
                      </div>
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#2c3854",
                        }}
                      >
                        {q.text.includes("&&emoji:") ? (
                          <>
                            <img
                              src={
                                "./assets/img/course_page/" +
                                q.text.split(":")[1] +
                                ".png"
                              }
                            />
                          </>
                        ) : (
                          q.text
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: -80,
                position: "relative",
                width: 202,
                height: 80,
                backgroundImage: "url('./assets/img/course_page/emojies.png')",
                paddingLeft: 22,
                paddingTop: 18,
                display: openEmojies ? "flex" : "none",
                justifyContent: "space-between",
                paddingRight: 12,
                zIndex: 90,
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
                onClick={() => {
                  setOpenEmojies(false)
                  emojies.push("clap")
                  emjs.emojies.push("clap")
                  if (!dialog) return
                  console.log(noduxMessages.id)
                  if (noduxMessages.id === -1) return
                  apiPost(dialoguesApi + noduxMessages.id + "/messages/", {
                    text: "&&emoji:clap",
                  })
                    .onStatus((res) => {}, 200, 201, 203, 204)
                    .onFail(() => {})
                    .afterAll(() => {
                      setTmp(tmp + 1)
                      downScroll()
                    })
                    .startSingle()
                }}
              >
                <img
                  src="./assets/img/course_page/clap.png"
                  style={{ width: 48, height: 48 }}
                />
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
                  setOpenEmojies(false)
                  emojies.push("ok")
                  emjs.emojies.push("ok")
                  // if (!dialog) return
                  console.log(noduxMessages.id)
                  if (noduxMessages.id === -1) return
                  apiPost(dialoguesApi + noduxMessages.id + "/messages/", {
                    text: "&&emoji:ok",
                  })
                    .onStatus((res) => {}, 200, 201, 203, 204)
                    .onFail(() => {})
                    .afterAll(() => {
                      setTmp(tmp + 1)
                      downScroll()
                    })
                    .startSingle()
                }}
              >
                <img
                  src="./assets/img/course_page/ok.png"
                  style={{ width: 48, height: 48 }}
                />
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
                  setOpenEmojies(false)
                  emojies.push("like")
                  emjs.emojies.push("like")
                  // if (!dialog) return
                  console.log(noduxMessages.id)
                  if (noduxMessages.id === -1) return
                  apiPost(dialoguesApi + noduxMessages.id + "/messages/", {
                    text: "&&emoji:like",
                  })
                    .onStatus((res) => {}, 200, 201, 203, 204)
                    .onFail(() => {})
                    .afterAll(() => {
                      setTmp(tmp + 1)
                      downScroll()
                    })
                    .startSingle()
                }}
              >
                <img
                  src="./assets/img/course_page/like.png"
                  style={{ width: 48, height: 48 }}
                />
              </div>
            </div>
            <div
              style={{
                height: 56,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#f8f8f8",
                boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.04)",
                borderRadius: 5,
              }}
            >
              <div
                style={{ height: 32, width: 32 }}
                onClick={() => {
                  setOpenEmojies(!openEmojies)
                }}
              >
                <img src="./assets/img/chat/emoji-smile.png" />
              </div>
              <div style={{ height: 32, width: 32 }} onClick={handleClick}>
                <img src="./assets/img/chat/file.png" />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <Input
                style={{
                  height: 32,
                  width: 718,
                  border: "0px solid red",
                  borderRadius: 16,
                }}
                placeholder={"Написать сообщение"}
                onChange={(e, d) => {
                  txt.text = d.value
                  setText(d.value)
                }}
                value={text}
              />
              <div
                style={{ height: 28, width: 30 }}
                onClick={() => {
                  setOpenEmojies(false)
                  const first_name = profile.profile
                    ? profile.profile.first_name !== "not_given" ||
                      profile.profile.first_name !== "not_giiven"
                      ? profile.profile.first_name
                      : ""
                    : ""
                  const last_name = profile.profile
                    ? profile.profile.last_name !== "not_given" ||
                      profile.profile.last_name !== "not_giiven"
                      ? profile.profile.last_name
                      : ""
                    : ""
                  // if (!dialog) return
                  console.log(noduxMessages.id)
                  if (noduxMessages.id === -1) return
                  apiPost(dialoguesApi + noduxMessages.id + "/messages/", {
                    text: txt.text,
                    dialog_id: noduxMessages.id,
                  })
                    .onStatus(
                      (res) => {
                        console.log(res.data)
                      },
                      200,
                      201,
                      202,
                      203,
                      204,
                    )
                    .onFail(() => {})
                    .afterAll(() => {
                      setTmp(tmp + 1)
                      downScroll()
                      setText("")
                    })
                    .startSingle()
                  /*
                  socket.socket.send(
                    JSON.stringify({
                      event: {
                        type: "message",
                        first_name: first_name,
                        last_name: last_name,
                        text: txt.text,
                        emojies: emjs.emojies,
                      },
                    }),
                  )*/
                }}
              >
                <img src="./assets/img/chat/send.png" />
              </div>
            </div>
          </div>
          <div style={{ height: 100 }}></div>
        </div>
        <div
          style={{
            position: "absolute",
            left: left + width + 14,
            top: top,
            width: 360,
            height: 40,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: "#ffffff",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: left + width + 14,
            top: top + 40,
            width: 360,
            height: 220,
            backgroundColor: "black",
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          }}
        >
          {lessonId ? (
            <Room
              type={
                profile.elementProfile
                  ? profile.elementProfile.type === 1
                    ? "user"
                    : "partner"
                  : "partner"
              }
              width={360}
              height={220}
              roomID={deleteMinuses(lessonId) + "cam"}
              lessonId={lessonId}
              control={
                profile.profile && 0
                  ? ctrs.data.filter((q) => q === profile.profile.user_id)
                      .length
                  : false
              }
              isOnVideo={
                profile.elementProfile
                  ? profile.elementProfile.type === 1
                    ? true
                    : true
                  : true
              }
              isOnAudio={
                profile.elementProfile
                  ? profile.elementProfile.type === 1
                    ? true
                    : true
                  : true
              }
              st={st}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          {lessonId && profile.elementProfile.type === 0 ? (
            <Room
              type={"user_audio"}
              roomID={deleteMinuses(lessonId) + "audio"}
              isOnAudio={
                profile.elementProfile
                  ? profile.elementProfile.type === 0
                    ? true
                    : false
                  : false
              }
              muted={
                vcs.data.filter((q) => q.user_id === profile.profile.user_id)
                  .length === 0 || muted
              }
              st={st}
            />
          ) : (
            <></>
          )}
          {lessonId && profile.elementProfile.type === 1 ? (
            <Room
              type={"audio"}
              roomID={deleteMinuses(lessonId) + "audio"}
              isOnAudio={
                profile.elementProfile
                  ? profile.elementProfile.type === 0
                    ? true
                    : false
                  : false
              }
              muted={
                vcs.data.filter((q) => q.user_id === profile.profile.user_id)
                  .length === 0 || muted
              }
              st={st}
            />
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: type === 0 ? "block" : "none",
            position: "absolute",
            left: left + width + 14,
            top: top + 260,
            width: 360,
          }}
        >
          <div
            style={{
              height: 48,
              marginTop: 20,
              marginBottom: 20,
              width: 360,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 48,
                backgroundColor: muted ? "#005cff" : "#f5f6f8",
                borderRadius: 5,
                boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="mute"
                size="big"
                color={muted ? "grey" : "grey"}
                onClick={(e, d) => {
                  socket.socket.send(
                    JSON.stringify({
                      event: {
                        type: vcs.data.filter(
                          (q) => q.user_id === profile.profile.user_id,
                        ).length
                          ? "no_voice"
                          : "no_voice",
                        user_id: profile.profile.user_id,
                      },
                    }),
                  )
                  setMuted(!muted)
                }}
              />
            </div>
            <div>
              <Button
                style={{
                  width: 288,
                  height: 48,
                  backgroundColor: profile.profile
                    ? wctrs.data.filter((q) => q === profile.profile.user_id)
                        .length > 0
                      ? "#00aaf4"
                      : "#005cff"
                    : "#005cff",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 600,
                }}
                onClick={() => {
                  socket.socket.send(
                    JSON.stringify({
                      event: {
                        type: "whants_control",
                        user_id: profile.profile.user_id,
                      },
                    }),
                  )
                  wctrs.data.push(profile.profile.user_id)
                  setTmp(tmp + 1)
                }}
                content={
                  profile.profile
                    ? wctrs.data.filter((q) => q === profile.profile.user_id)
                        .length > 0
                      ? "Рука поднята"
                      : "Поднять руку"
                    : "Поднять руку"
                }
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 24,
              color: "#2c3854",
              width: 360,
              height: 40,
            }}
          ></div>
          <div
            style={{
              marginTop: 40,
              fontWeight: 600,
              fontSize: 16,
              color: "#334d6e",
            }}
          >
            Файлы для скачивания
          </div>
          {press.map((q) => (
            <>
              <div
                style={{
                  marginTop: 20,
                  width: 360,
                  height: 66,
                  background: "#FFFFFF",
                  boxShadow: "0px 4px 10px rgba(0, 71, 255, 0.25)",
                  borderRadius: 5,
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#2c3854",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  window.open(q.file)
                }}
              >
                {q.title}
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            display: type === 1 ? "block" : "none",
            position: "absolute",
            left: left + width + 14,
            top: top + 260,
            width: 360,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontWeight: 600,
              fontSize: 24,
              color: "#2c3854",
              width: 360,
              height: 40,
            }}
          >
            {
              //40: 01
            }
          </div>
          <div
            style={{
              width: 360,
              marginTop: 44,
              boxShadow: "0px 0px 10px rgba(201, 201, 201, 0.25)",
            }}
          >
            <div
              style={{
                width: 360,
                height: 40,
                backgroundColor: "#ffffff",
                color: "#005cff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 600,
                fontSize: 16,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <div>{lesson ? lesson.group.title : ""}</div>
              <div>
                <Icon name="computer" color="blue" circular />
                <Icon name="mute" color="blue" circular />
              </div>
            </div>
            {students.map((q) => (
              <>
                <div
                  style={{
                    width: 360,
                    height: 44,
                    backgroundColor: wctrs.data.filter(
                      (w) => w === q.user.user_id,
                    ).length
                      ? "#005cff"
                      : "#ffffff",
                    opacity: q === 0 || q === 1 ? 0.2 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    fontSize: 16,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <div
                    style={{
                      color: wctrs.data.filter((w) => w === q.user.user_id)
                        .length
                        ? "#ffffff"
                        : "#334d6e",
                    }}
                  >
                    {q.user.first_name + " " + q.user.last_name}
                  </div>
                  <div
                    style={{
                      display: wctrs.data.filter((w) => w === q.user.user_id)
                        .length
                        ? "block"
                        : "none",
                    }}
                  >
                    <img
                      src="./assets/img/course_page/palm.png"
                      onClick={() => {
                        socket.socket.send(
                          JSON.stringify({
                            event: {
                              type: "no_whants_control",
                              user_id: q.user.user_id,
                            },
                          }),
                        )
                      }}
                    />
                  </div>
                  <div>
                    <Icon
                      name="computer"
                      color={
                        ctrs.data.filter((w) => w === q.user.user_id).length
                          ? "grey"
                          : "blue"
                      }
                      circular
                      style={{
                        backgroundColor: ctrs.data.filter(
                          (w) => w === q.user.user_id,
                        ).length
                          ? "#005cff"
                          : "#ffffff",
                      }}
                      onClick={() => {
                        if (
                          ctrs.data.filter((w) => w === q.user.user_id).length
                        ) {
                          socket.socket.send(
                            JSON.stringify({
                              event: {
                                type: "no_control",
                                user_id: q.user.user_id,
                              },
                            }),
                          )
                          const t = []
                          for (let i = 0; i < ctrs.data; i++) {
                            if (ctrs.data[i] !== q.user.user_id) {
                              t.push(ctrs.data[i])
                            }
                          }
                          ctrs.data = t
                          const y = []
                          for (let i = 0; i < wctrs.data; i++) {
                            if (wctrs.data[i] !== q.user.user_id) {
                              y.push(wctrs.data[i])
                            }
                          }
                          wctrs.data = y
                          setControl(null)
                          setWhantsControl(null)
                        } else {
                          socket.socket.send(
                            JSON.stringify({
                              event: {
                                type: "control",
                                user_id: q.user.user_id,
                              },
                            }),
                          )
                          ctrs.data.push(q.user.user_id)
                          setControl(q.user.user_id)
                        }
                      }}
                    />
                    <Icon
                      name="mute"
                      color={
                        vcs.data.filter((w) => w === q.user.user_id)
                          ? "grey"
                          : "blue"
                      }
                      style={{
                        backgroundColor: vcs.data.filter(
                          (w) => w === q.user.user_id,
                        ).length
                          ? "#005cff"
                          : "#ffffff",
                      }}
                      onClick={() => {
                        if (
                          vcs.data.filter((w) => w === q.user.user_id).length
                        ) {
                          socket.socket.send(
                            JSON.stringify({
                              event: {
                                type: "no_voice",
                                user_id: q.user.user_id,
                              },
                            }),
                          )
                          const t = []
                          for (let i = 0; i < vcs.data; i++) {
                            if (vcs.data[i] !== q.user.user_id) {
                              t.push(vcs.data[i])
                            }
                          }
                          vcs.data = t
                          setVoice(null)
                        } else {
                          socket.socket.send(
                            JSON.stringify({
                              event: {
                                type: "voice",
                                user_id: q.user.user_id,
                              },
                            }),
                          )
                          setVoice(q.user.user_id)
                          vcs.data.push(q.user.user_id)
                        }
                      }}
                      circular
                    />
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

export default CoursePage
