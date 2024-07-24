import {useState, useEffect} from 'react'

import './index.css'

const DropdownSingleSelect = props => {
  const {
    optionsList,
    setScoreFunction,
    setActiveOptionIndex,
    activeOptionIndex,
  } = props
  const initialOption = activeOptionIndex === -1 ? 0 : activeOptionIndex
  const [selectedOption, setSelectedOption] = useState(initialOption)
  const correctOptionId = optionsList.map(ele => ele.isCorrect).indexOf(true)

  useEffect(() => {
    if (correctOptionId === selectedOption) {
      setScoreFunction(1, selectedOption, true)
    } else {
      setScoreFunction(0, selectedOption, true)
    }
    if (activeOptionIndex === -1) {
      setActiveOptionIndex(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptionIndex])

  const checkAnswerAndAddScore = isCorrect => {
    if (isCorrect) {
      setScoreFunction(1, selectedOption, true)
    } else {
      setScoreFunction(0, selectedOption, true)
    }
  }

  const onChangeUpdateSelectedOption = e => {
    const optionId = Number(e.target.value)
    setSelectedOption(optionId)
    setActiveOptionIndex(optionId)
    checkAnswerAndAddScore(optionId === correctOptionId)
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
