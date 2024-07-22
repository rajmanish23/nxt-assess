import {useState, useEffect} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {optionsList, setScoreFunction} = props

  const initialValue = optionsList[0].id
  const [selectedOption, setSelectedOption] = useState(initialValue)
  const correctOptionId = optionsList.find(ele => ele.isCorrect).id

  useEffect(() => {
    if (correctOptionId === selectedOption) {
      setScoreFunction(1, selectedOption, true)
    } else {
      setScoreFunction(0, selectedOption, true)
    }
    // eslint-disable-next-line
  }, [])

  const checkAnswerAndAddScore = isCorrect => {
    if (isCorrect) {
      setScoreFunction(1, selectedOption, true)
    } else {
      setScoreFunction(0, selectedOption, true)
    }
  }

  const onChangeUpdateSelectedOption = e => {
    const optionId = e.target.value
    setSelectedOption(optionId)
    checkAnswerAndAddScore(optionId === correctOptionId)
  }

  return (
    <select
      className="question-dropdown-container"
      value={selectedOption}
      onChange={onChangeUpdateSelectedOption}
    >
      {optionsList.map(eachOption => {
        const {id, text} = eachOption
        return (
          <option key={id} value={id} className="question-dropdown-option-item">
            {text}
          </option>
        )
      })}
    </select>
  )
}

export default DropdownSingleSelect
