import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Peer from "simple-peer"
const videoConstraints = {
  height: window.innerHeight,
  width: window.innerWidth,
}
const Video = (props) => {
  const { peer, width, height, index } = props
  const ref = useRef()
  useEffect(() => {
    console.log(peer)
    console.log(ref.current)
    console.log(index)
    peer.on("stream", (stream) => {
      console.log(stream)
      ref.current.srcObject = stream
    })
    return () => {}
  }, [])
  return (
    <>
      <video height={height} width={width} playsInline autoPlay ref={ref} />
    </>
  )
}
const Audio = (props) => {
  const { peer, width, height, index } = props
  const ref = useRef()
  useEffect(() => {
    peer.on("stream", (stream) => {
      console.log(stream)
      ref.current.srcObject = stream
    })
    return () => {}
  }, [])
  return (
    <>
      <audio playsInline autoPlay ref={ref} hidden />
    </>
  )
}
const Room = (props) => {
  const [peers, setPeers] = useState([])
  const socketRef = useRef()
  const userVideo = useRef()
  const userAudio = useRef()
  const peersRef = useRef([])
  const senders = useRef([])
  const userStream = useRef()
  const [userid, setUserid] = useState("")
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
    st,
  } = props
  let { mediaRecorder } = props
  useEffect(() => {
    if (share && type === "user") {
      socketRef.current = io.connect("https://influunt.elementschool.kz/")
      navigator.mediaDevices
        .getDisplayMedia({
          video: { width: width, height: height },
          audio: true,
        })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream
          }
          if (type === "user") {
            socketRef.current.emit("join room", roomID)
          } else {
            socketRef.current.emit("get users", roomID)
          }
          socketRef.current.on("all users", (users) => {
            const peers = []
            users.forEach((userID) => {
              const peer = createPeer(userID, socketRef.current.id, stream)
              peersRef.current.push({
                peerID: userID,
                peer,
              })
              peers.push(peer)
            })
            setPeers(peers)
          })
          socketRef.current.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream)
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            })
            setPeers((users) => [...users, peer])
          })
          socketRef.current.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id)
            item.peer.signal(payload.signal)
          })
          if (upload) {
            mediaRecorder.mediaRecorder = new MediaRecorder(stream)
            console.log(mediaRecorder.mediaRecorder)
            mediaRecorder.mediaRecorder.ondataavailable = handleDataAvailable
            mediaRecorder.mediaRecorder.start(1000)
            console.log(mediaRecorder.mediaRecorder)
          }
          const stp = () => {
            const tracks = stream.getTracks()
            if (userVideo.current) {
              userVideo.current.srcObject = null
            }
            if (mediaRecorder) {
              if (mediaRecorder.mediaRecorder) {
                mediaRecorder.mediaRecorder = null
              }
            }
            tracks.forEach((track) => {
              console.log("trackstop")
              track.stop()
            })
          }
          st.f.push(stp)
        })
    } else {
      socketRef.current = io.connect("https://influunt.elementschool.kz/")
      navigator.mediaDevices
        .getUserMedia({
          video:
            type === "audio" || type === "user_audio"
              ? false
              : { width: width, height: height },
          audio: true,
        })
        .then((stream) => {
          if (type === "user" || type === "user_audio") {
            socketRef.current.emit("join room", roomID)
          } else {
            socketRef.current.emit("get users", roomID)
          }
          socketRef.current.on("all users", (users) => {
            const peers = []
            users.forEach((userID) => {
              const peer = createPeer(userID, socketRef.current.id, stream)
              peersRef.current.push({
                peerID: userID,
                peer,
              })
              peers.push(peer)
            })
            setPeers(peers)
          })
          socketRef.current.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream)
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            })
            setPeers((users) => [...users, peer])
          })
          socketRef.current.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id)
            item.peer.signal(payload.signal)
          })
          if (upload) {
            mediaRecorder.mediaRecorder = new MediaRecorder(stream)
            console.log(mediaRecorder.mediaRecorder)
            mediaRecorder.mediaRecorder.ondataavailable = handleDataAvailable
            mediaRecorder.mediaRecorder.start(1000)
            console.log(mediaRecorder.mediaRecorder)
          }
          const stp = () => {
            const tracks = stream.getTracks()
            if (userVideo.current) {
              userVideo.current.srcObject = null
            }
            if (mediaRecorder) {
              if (mediaRecorder.mediaRecorder) {
                mediaRecorder.mediaRecorder = null
              }
            }
            tracks.forEach((track) => {
              console.log("trackstop")
              track.stop()
            })
          }
          st.f.push(stp)
        })
    }
    if (type === "user" && !share) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: width, height: height },
          audio: false,
        })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream
          }
        })
    }
    return () => {}
  }, [])
  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      })
    })
    return peer
  }
  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })
    peer.signal(incomingSignal)
    return peer
  }
  return (
    <>
      <div style={{ position: "relative", zIndex: 80 }}>
        {type === "partner" ? (
          <>
            {peers.map((peer, index) => {
              return (
                <>
                  <Video
                    key={index}
                    height={height}
                    width={width}
                    peer={peer}
                  />
                </>
              )
            })}
          </>
        ) : type === "user" ? (
          <>
            <video
              // muted={muted}
              ref={userVideo}
              autoPlay
              playsInline
              height={height}
              width={width}
            />
          </>
        ) : type === "audio" ? (
          <>
            {peers.map((peer, index) => (
              <>
                <Audio peer={peer} index={index} />
              </>
            ))}
          </>
        ) : type === "user_audio" ? (
          <>
            <audio autoPlay playsInline hidden muted={muted} ref={userVideo} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
export default Room
