import './index.css'

const TextMultiSelect = props => {
  const {optionDetails, setScoreFunc, isSelected, optionIndex} = props

  const {text, isCorrect} = optionDetails

  const selectedClass = isSelected ? 'active-option-highlight' : ''

  const onClickSetAsActive = () => {
    setScoreFunc(optionIndex, isCorrect)
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
