import './index.css'

const ImageMultiSelect = props => {
  const {optionDetails, setScoreFunc, isSelected, optionIndex} = props

  const {text, imageUrl, isCorrect} = optionDetails

  const selectedClass = isSelected ? 'active-option-outline' : ''

  const checkCorrectAndSetScore = () => {
    if (isCorrect) {
      setScoreFunc(1, optionIndex, true)
    } else {
      setScoreFunc(0, optionIndex, true)
    }
  }

  const onClickSetAsActive = () => {
    checkCorrectAndSetScore()
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
