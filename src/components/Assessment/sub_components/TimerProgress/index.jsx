import './index.css'

const TimerProgress = props => {
  const {
    endAssessment,
    currentTime,
    questionsProgressList,
    currentQuestionIndex,
  } = props

  const renderTimeBar = () => {
    // formats time (in seconds) into a string to display
    const date = new Date(0)
    date.setSeconds(currentTime)
    const timeString = date.toISOString().substring(11, 19)
    return (
      <div className="assess-time-bar">
        <p className="assess-time-bar-label">Time Left</p>
        <p className="assess-time-bar-text">{timeString}</p>
      </div>
    )
  }

  const renderSubmitButton = () => (
    <button
      type="button"
      className="assess-submit-button"
      onClick={endAssessment}
    >
      Submit Assessment
    </button>
  )

  const renderProgressContainer = () => {
    let numAttempted = 0
    let numUnattempted = 0
    questionsProgressList.forEach(value => {
      if (value) {
        numAttempted++
      } else {
        numUnattempted++
      }
    })
    const totalQuestions = questionsProgressList.length

    return (
      <div className="assess-progress-container">
        <div className="assess-progress-details-summary-container">
          <div className="assess-progress-details-summary-text-container">
            <div className="assess-attempted-total-num">
              <p className="assess-attempted-total-num-text">{numAttempted}</p>
            </div>
            <p className="assess-details-summary-label">Answered Questions</p>
          </div>
          <div className="assess-progress-details-summary-text-container">
            <div className="assess-unattempted-total-num">
              <p className="assess-attempted-total-num-text">
                {numUnattempted}
              </p>
            </div>
            <p className="assess-details-summary-label">Unanswered Questions</p>
          </div>
        </div>
        <div className="assess-progress-details-container">
          <div className="assess-detailed-progress">
            <h1 className="assess-detailed-progress-heading">
              {`Questions (${totalQuestions})`}
            </h1>
            <ul className="assess-detailed-progress-list-container">
              {questionsProgressList.map((isAnswered, index) => {
                const highlightClass = isAnswered ? 'assess-attempted' : ''
                let activeHighlightClass = ''
                if (currentQuestionIndex === index) {
                  activeHighlightClass = 'assess-current'
                }
                return (
                  <li
                    className={`assess-detailed-progress-list-item ${highlightClass} ${activeHighlightClass}`}
                  >
                    <p className="assess-detailed-progress-text">{index + 1}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          {renderSubmitButton()}
        </div>
      </div>
    )
  }

  return (
    <div className="assess-time-progress-container">
      {renderTimeBar()}
      {renderProgressContainer()}
    </div>
  )
}

export default TimerProgress
