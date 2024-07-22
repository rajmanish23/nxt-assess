import React from 'react'

const ScoreContext = React.createContext({
  score: 0,
  setScore: () => {},
  timeRemaining: 0,
  setTimeRemaining: () => {},
})

export default ScoreContext
