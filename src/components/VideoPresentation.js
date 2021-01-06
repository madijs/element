import React, { Component } from "react"
import { Player } from "video-react"

class VideoPresentation extends Component {
  state = {}
  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this))
    /*
    this.props.playerFunction.function = (e) => {
      if (e.paused) {
        this.player.pause()
      } else {
        this.player.play()
      }
      this.player.seek(e.currentTime)
      this.setState({
        player: { currentTime: e.currentTime, paused: e.paused },
      })
    }
    */
  }
  handleStateChange = (state) => {
    const { profile, socket, control } = this.props
    /*
    if (profile.elementProfile && 0) {
      if (profile.elementProfile.type === 1 || control) {
        socket.socket.send(
          JSON.stringify({
            event: {
              type: "video-presentation",
              player: { currentTime: state.currentTime, paused: state.paused },
            },
          }),
        )
      }
    }
    this.setState({
      player: { currentTime: state.currentTime, paused: state.paused },
    })
    */
    this.setState({
      player: state,
    })
  }
  render() {
    const { height, width, top, left, url } = this.props
    return (
      <>
        <div
          style={{
            width: width,
            height: height - 48,
            backgroundColor: "yellow",
            position: "absolute",
            left: left,
            top: top + 48,
            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
          }}
        >
          <Player
            fluid={false}
            width={width}
            height={height - 48}
            src={url}
            ref={(player) => {
              this.player = player
            }}
          />
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
}

export default VideoPresentation
