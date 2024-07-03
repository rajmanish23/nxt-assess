const TimerProgress = props => {
  const {endAssessment, currentTime} = props

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

  return (
    <div className="assess-time-progress-container">
      {renderTimeBar()}
      {renderSubmitButton()}
    </div>
  )
}

export default TimerProgress
