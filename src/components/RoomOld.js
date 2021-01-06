import React, { useRef, useEffect, createRef } from "react"
import io from "socket.io-client"
import { withRouter } from "react-router-dom"
import SparkMD5 from "spark-md5"
import $ from "jquery"
import { noTypedLessonsApi } from "../config/apiUrls"
import { fileupload } from "blueimp-file-upload"

const Room = (props) => {
  const userVideo = useRef()
  const userAudio = useRef()
  const partnerVideo = useRef()
  const peerRef = useRef()
  const socketRef = useRef()
  const otherUser = useRef()
  const userStream = useRef()
  const senders = useRef([])
  const chunkedUploadRef = useRef()
  const {
    roomID,
    type,
    width,
    height,
    share,
    isOnAudio,
    isOnVideo,
    upload,
    lessonId,
    handleDataAvailable,
    muted,
  } = props

  let { mediaRecorder } = props

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: isOnAudio, video: isOnVideo })
      .then((stream) => {
        console.log(stream)
        console.log(userVideo)
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        } else if (userAudio.current) {
          userAudio.current.srcObject = stream
        }
        userStream.current = stream
        //socketRef.current = io.connect("https://185.125.91.73:86")
        //socketRef.current = io.connect("https://elementschool.kz/", {
        //  path: "/server/socket.io/",
        //})
        socketRef.current = io.connect("/")
        console.log(roomID)
        socketRef.current.emit(
          "join room",
          // props.match.params.roomID
          roomID,
        )
        socketRef.current.on("other user", (userID) => {
          console.log(userID + "other")
          callUser(userID)
          otherUser.current = userID
        })
        socketRef.current.on("user joined", (userID) => {
          console.log(userID + "user")
          otherUser.current = userID
        })
        socketRef.current.on("offer", handleRecieveCall)
        socketRef.current.on("answer", handleAnswer)
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg)
        if (upload) {
          mediaRecorder.mediaRecorder = new MediaRecorder(stream)
          console.log(mediaRecorder.mediaRecorder)
          mediaRecorder.mediaRecorder.ondataavailable = handleDataAvailable
          mediaRecorder.mediaRecorder.start(1000)
          console.log(mediaRecorder.mediaRecorder)
        }
      })
    if (share) {
      shareScreen()
    }
    return () => {}
  }, [])

  const callUser = (userID) => {
    peerRef.current = createPeer(userID)
    userStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, userStream.current),
        ),
      )
  }

  const createPeer = (userID) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    })
    peer.onicecandidate = handleICECandidateEvent
    peer.ontrack = handleTrackEvent
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID)
    return peer
  }

  const handleNegotiationNeededEvent = (userID) => {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer)
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        }
        socketRef.current.emit("offer", payload)
      })
      .catch((e) => console.log(e))
  }

  const handleRecieveCall = (incoming) => {
    peerRef.current = createPeer()
    const desc = new RTCSessionDescription(incoming.sdp)
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current),
          )
      })
      .then(() => {
        return peerRef.current.createAnswer()
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer)
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        }
        socketRef.current.emit("answer", payload)
      })
  }

  const handleAnswer = (message) => {
    const desc = new RTCSessionDescription(message.sdp)
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e))
  }

  const handleICECandidateEvent = (e) => {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      }
      socketRef.current.emit("ice-candidate", payload)
    }
  }

  const handleNewICECandidateMsg = (incoming) => {
    const candidate = new RTCIceCandidate(incoming)
    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e))
  }

  const handleTrackEvent = (e) => {
    if (partnerVideo.curent) {
      partnerVideo.current.srcObject = e.streams[0]
    }
  }

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0]
      console.log(
        senders.current.find((sender) => sender.track.kind === "video"),
      )
      if (!senders.current.find((sender) => sender.track.kind === "video"))
        return
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(screenTrack)
      screenTrack.onended = function () {
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(userStream.current.getTracks()[1])
      }
    })
  }

  return (
    <div>
      {type === "partner" ? (
        <>
          <video
            controls
            style={{ height: height, width: width }}
            autoPlay
            ref={partnerVideo}
          />
        </>
      ) : type === "user" ? (
        <>
          <video
            controls
            style={{ height: height, width: width }}
            autoPlay
            ref={userVideo}
          />
        </>
      ) : type === "audio" ? (
        <>
          <audio controls autoPlay ref={userAudio} style={{}} muted={muted} />
        </>
      ) : (
        <></>
      )}
      {
        //<button onClick={shareScreen}>Share screen</button>
      }
    </div>
  )
}

export default Room
