import React from 'react'

const ScoreContext = React.createContext({
  score: 0,
  setContextScore: () => {},
  timeRemaining: 0,
  setTimeRemaining: () => {},
})

export default ScoreContext
