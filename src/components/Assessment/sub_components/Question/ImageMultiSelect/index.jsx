import './index.css'

const ImageMultiSelect = props => {
  const {
    optionDetails,
    setScoreFunc,
    isSelected,
    optionIndex,
    setActiveOptionId,
  } = props

  const {text, imageUrl, isCorrect} = optionDetails

  const selectedClass = isSelected ? 'active-option-outline' : ''

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
    <li className="question-image-option-container">
      <button
        className={`question-image-option-button ${selectedClass}`}
        onClick={onClickSetAsActive}
        type="button"
      >
        <img src={imageUrl} alt={text} className="question-image" />
      </button>
    </li>
  )
}

export default ImageMultiSelect
