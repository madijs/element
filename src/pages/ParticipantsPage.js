import React from "react"

const participants = [
  { user: "11" },
  { user: "123" },
  { user: "ll" },
  { user: "12" },
]

const ParticipantsPage = () => {
  return (
    <>
      <div>
        {participants.map((q) => (
          <>
            <div>{q.user}</div>
          </>
        ))}
      </div>
    </>
  )
}

export default ParticipantsPage
