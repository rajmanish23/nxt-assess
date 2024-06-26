const Question = props => {
  const {
    nextQuestionFunction,
    questionData,
    currentQuestionIndex,
    totalQuestions,
  } = props

  const isNextQuestionAvailable = currentQuestionIndex < totalQuestions - 1

  const renderNextQuestionButton = () => (
    <button type="button" onClick={nextQuestionFunction}>
      next question
    </button>
  )

  return (
    <div className="question-bg-container">
      <h1>{`Question Number: ${currentQuestionIndex + 1}`}</h1>
      {isNextQuestionAvailable && renderNextQuestionButton()}
    </div>
  )
}

export default Question
