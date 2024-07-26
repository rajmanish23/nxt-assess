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
      setScoreFunction(selectedOption, true)
    } else {
      setScoreFunction(selectedOption, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeUpdateSelectedOption = e => {
    const optionId = e.target.value
    const optionIndex = optionIdIndexMap.indexOf(optionId)
    const isCorrect = optionIndex === correctOptionId
    setSelectedOption(optionIndex)
    setScoreFunction(optionIndex, isCorrect)
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
