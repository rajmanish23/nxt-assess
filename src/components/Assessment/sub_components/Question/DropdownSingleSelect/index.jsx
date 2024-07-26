import {useState, useEffect} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {optionsList, setScoreFunction, activeOptionIndex} = props
  const initialOption = activeOptionIndex === -1 ? 0 : activeOptionIndex
  const [selectedOption, setSelectedOption] = useState(initialOption)
  const correctOptionId = optionsList.map(ele => ele.isCorrect).indexOf(true)

  useEffect(() => {
    if (correctOptionId === selectedOption) {
      setScoreFunction(1, selectedOption, true)
    } else {
      setScoreFunction(0, selectedOption, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAnswerAndAddScore = (isCorrect, optionId) => {
    if (isCorrect) {
      console.log('check answer and add score called')
      setScoreFunction(1, optionId, true)
    } else {
      setScoreFunction(0, optionId, true)
    }
  }

  const onChangeUpdateSelectedOption = e => {
    const optionId = Number(e.target.value)
    setSelectedOption(optionId)
    checkAnswerAndAddScore(optionId === correctOptionId, optionId)
  }

  return (
    <select
      className="question-dropdown-container"
      value={selectedOption}
      onChange={onChangeUpdateSelectedOption}
    >
      {optionsList.map((eachOption, index) => {
        const {id, text} = eachOption
        return (
          <option
            key={id}
            value={index}
            className="question-dropdown-option-item"
          >
            {text}
          </option>
        )
      })}
    </select>
  )
}

export default DropdownSingleSelect
