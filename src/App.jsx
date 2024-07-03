import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import ScoreContext from './context/ScoreContext'

import './App.css'

const App = () => {
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const setScoreContext = finalScore => {
    setScore(finalScore)
  }

  const setTimeRemainingContext = finalTime => {
    setTimeRemaining(finalTime)
  }

  return (
    <ScoreContext.Provider
      value={{
        contextScore: score,
        setScoreContext,
        contextTimeRemaining: timeRemaining,
        setTimeRemainingContext,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </ScoreContext.Provider>
  )
}

export default App
