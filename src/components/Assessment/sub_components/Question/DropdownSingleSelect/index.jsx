import {useState, useEffect} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {optionsList, setScoreFunction, setQuestionAttempt} = props

  const initialValue = optionsList[0].id
  const [selectedOption, setSelectedOption] = useState(initialValue)

  useEffect(() => setQuestionAttempt(true), [setQuestionAttempt])

  const checkAnswerAndAddScore = isCorrect => {
    if (isCorrect) {
      setScoreFunction(1)
    } else {
      setScoreFunction(0)
    }
  }

  const onChangeUpdateSelectedOption = e => {
    setSelectedOption(e.target.value)
  }

  return (
    <select
      className="question-dropdown-container"
      value={selectedOption}
      onChange={onChangeUpdateSelectedOption}
    >
      {optionsList.map(eachOption => {
        const {id, text, isCorrect} = eachOption
        const onClickCkeckAnswer = () => {
          checkAnswerAndAddScore(isCorrect)
        }
        return (
          <option
            key={id}
            value={id}
            className="question-dropdown-option-item"
            onClick={onClickCkeckAnswer}
          >
            {text}
          </option>
        )
      })}
    </select>
  )
}

export default DropdownSingleSelect
