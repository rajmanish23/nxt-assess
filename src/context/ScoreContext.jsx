import React from 'react'

const ScoreContext = React.createContext({
  score: 0,
  setScoreContext: () => {},
  timeRemaining: 0,
  setTimeRemainingContext: () => {},
})

export default ScoreContext
