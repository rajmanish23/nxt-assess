import './index.css'

const TextMultiSelect = props => {
  const {
    optionDetails,
    setScoreFunc,
    isSelected,
    optionIndex,
    setActiveOptionId,
  } = props

  const {text, isCorrect} = optionDetails

  const selectedClass = isSelected ? 'active-option-highlight' : ''

  const checkCorrectAndSetScore = () => {
    if (isCorrect) {
      setScoreFunc(1)
    } else {
      setScoreFunc(0)
    }
  }

  const onClickSetAsActive = () => {
    checkCorrectAndSetScore()
    setActiveOptionId(optionIndex)
  }

  return (
    <li className="question-text-option-container">
      <button
        className={`question-text-option-button ${selectedClass}`}
        onClick={onClickSetAsActive}
        type="button"
      >
        {text}
      </button>
    </li>
  )
}

export default TextMultiSelect
