import './index.css'

const ImageMultiSelect = props => {
  const {optionDetails, setScoreFunc, isSelected, optionIndex} = props

  const {text, imageUrl, isCorrect} = optionDetails

  const selectedClass = isSelected ? 'active-option-outline' : ''

  const onClickSetAsActive = () => {
    setScoreFunc(optionIndex, isCorrect)
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
