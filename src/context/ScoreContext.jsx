import React from 'react'

const ScoreContext = React.createContext({
  contextScore: 0,
  setScoreContext: () => {},
  contextTimeRemaining: 0,
  setTimeRemainingContext: () => {},
})

export default ScoreContext
