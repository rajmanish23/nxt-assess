import Header from '../Header'

import './index.css'

import inTimeImage from '../../assets/results-in-time-image.png'
import notInTimeImage from '../../assets/results-not-in-time-image.png'

const Results = ({time = 0, score = 0, history}) => {
  const onClickOpenAssessment = () => {
    history.push('/assessment')
  }

  // selects image and alt based on timer
  const imageToUse = time === 0 ? notInTimeImage : inTimeImage
  const imageAltToUse = time === 0 ? 'time up' : 'submit'

  // formats time (in seconds) into a string to display
  const date = new Date(0)
  date.setSeconds(time)
  const timeString = date.toISOString().substring(11, 19)

  return (
    <div className="global-bg-container">
      <Header />
      <div className="results-bg-container">
        <div className="results-card-container">
          <img className="results-image" src={imageToUse} alt={imageAltToUse} />
          {
            // Heading in card
            time !== 0 ? (
              <h1 className="results-score-heading">
                Congrats! You completed the assessment.
              </h1>
            ) : (
              <h1 className="results-time-heading">Time is up</h1>
            )
          }
          {
            // Paragraph/text thing in the card
            time !== 0 ? (
              <p className="results-score-para">
                Time Taken:
                <span className="results-final-time-display">{timeString}</span>
              </p>
            ) : (
              <p className="results-time-para">
                You did not complete the assessment within the time.
              </p>
            )
          }
          <p className="results-final-score-text">
            Your Score:
            <span className="results-final-score-number">{score}</span>
          </p>
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
