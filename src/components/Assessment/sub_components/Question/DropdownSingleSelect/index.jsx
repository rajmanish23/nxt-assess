import {useState, useEffect} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {optionsList, setScoreFunction, activeOptionIndex} = props
  const initialOption = activeOptionIndex === -1 ? 0 : activeOptionIndex
  const [selectedOption, setSelectedOption] = useState(initialOption)
  const correctOptionId = optionsList.map(ele => ele.isCorrect).indexOf(true)
  const optionIdIndexMap = optionsList.map(ele => ele.id)

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
      setScoreFunction(1, optionId, true)
    } else {
      setScoreFunction(0, optionId, true)
    }
  }

  const onChangeUpdateSelectedOption = e => {
    const optionId = e.target.value
    const optionIndex = optionIdIndexMap.indexOf(optionId)
    setSelectedOption(optionIndex)
    checkAnswerAndAddScore(optionIndex === correctOptionId, optionIndex)
  }

  return (
    <select
      className="question-dropdown-container"
      value={optionIdIndexMap[selectedOption]}
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
