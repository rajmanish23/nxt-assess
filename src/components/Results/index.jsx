import {useContext} from 'react'

import Header from '../Header'

import ScoreContext from '../../context/ScoreContext'

import './index.css'

import inTimeImage from '../../assets/results-in-time-image.png'
import notInTimeImage from '../../assets/results-not-in-time-image.png'

const Results = ({history}) => {
  const {score, timeRemaining} = useContext(ScoreContext)

  const onClickOpenAssessment = () => {
    history.push('/assessment')
  }

  // selects image and alt based on timer
  const imageToUse = timeRemaining === 0 ? notInTimeImage : inTimeImage
  const imageAltToUse = timeRemaining === 0 ? 'time up' : 'submit'

  // formats time (in seconds) into a string to display
  const date = new Date(0)
  date.setSeconds(timeRemaining)
  const timeString = date.toISOString().substring(11, 19)

  return (
    <div className="global-bg-container">
      <Header />
      <div className="results-bg-container">
        <div className="results-card-container">
          <img className="results-image" src={imageToUse} alt={imageAltToUse} />
          {
            // Heading in card
            timeRemaining !== 0 ? (
              <h1 className="results-score-heading">
                Congrats! You completed the assessment.
              </h1>
            ) : (
              <h1 className="results-time-heading">Time is up!</h1>
            )
          }
          {
            // Paragraph/text thing in the card
            timeRemaining !== 0 ? (
              <div className="results-time-text-container">
                <p className="results-score-para">Time Taken:</p>
                <p className="results-final-time-display">{timeString}</p>
              </div>
            ) : (
              <p className="results-time-para">
                You did not complete the assessment within the time.
              </p>
            )
          }
          <div className="results-score-text-container">
            <p className="results-final-score-text">Your Score:</p>
            <p className="results-final-score-number">{score}</p>
          </div>
          <button
            className="results-restart-button"
            onClick={onClickOpenAssessment}
            type="button"
          >
            Reattempt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
