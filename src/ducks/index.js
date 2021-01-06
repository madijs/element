import { combineReducers } from "redux"
import profile from "./profile"
import alerts from "./alerts"
import chats from "./chats"
import participants from "./participants"
import dialogues from "./dialogues"
import lessonMessages from "./lessonMessages"

export default combineReducers({
  profile,
  alerts,
  chats,
  participants,
  dialogues,
  lessonMessages,
})
