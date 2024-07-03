import {useState} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {optionsList, setScoreFunction, setActiveOptionId} = props

  const initialValue = optionsList[0].text
  const [selectedOption, setSelectedOption] = useState(initialValue)
  setActiveOptionId(0)

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
      {optionsList.map((eachOption, index) => {
        const {id, text, isCorrect} = eachOption
        const onClickCkeckAnswer = () => {
          checkAnswerAndAddScore(isCorrect)
        }
        return (
          <option
            key={id}
            value={text}
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
