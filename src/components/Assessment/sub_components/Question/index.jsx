import {useState} from 'react'

import DropdownSingleSelect from './DropdownSingleSelect'
import ImageMultiSelect from './ImageMultiSelect'
import TextMultiSelect from './TextMultiSelect'

const Question = props => {
  const {
    nextQuestionFunction,
    questionData,
    currentQuestionIndex,
    totalQuestions,
    setScoreFunc,
    setQuestionAttempt,
  } = props

  const [activeOptionIndex, setActiveOptionIndex] = useState(-1)
  const [scoreToAdd, setScoreToAdd] = useState(0)

  const isNextQuestionAvailable = currentQuestionIndex < totalQuestions - 1

  const onClickNext = () => {
    setQuestionAttempt(activeOptionIndex !== -1)
    nextQuestionFunction()
    setScoreFunc(scoreToAdd)
    setActiveOptionIndex(-1)
    setScoreToAdd(0)
  }

  const renderNextQuestionButton = () => (
    <button type="button" onClick={onClickNext}>
      Next Question
    </button>
  )

  const renderQuestion = () => {
    const {questionText, optionsType, options} = questionData

    let optionsView = null
    switch (optionsType) {
      case 'DEFAULT':
        optionsView = (
          <ul className="question-options-list-container">
            {options.map((eachOption, index) => (
              <TextMultiSelect
                optionDetails={eachOption}
                isSelected={activeOptionIndex === index}
                optionIndex={index}
                setActiveOptionId={setActiveOptionIndex}
                setScoreFunc={setScoreToAdd}
                key={eachOption.id}
              />
            ))}
          </ul>
        )
        break
      case 'IMAGE':
        optionsView = (
          <ul className="question-options-list-container">
            {options.map((eachOption, index) => (
              <ImageMultiSelect
                optionDetails={eachOption}
                isSelected={activeOptionIndex === index}
                optionIndex={index}
                setActiveOptionId={setActiveOptionIndex}
                setScoreFunc={setScoreToAdd}
                key={eachOption.id}
              />
            ))}
          </ul>
        )
        break
      case 'SINGLE_SELECT':
        // setActiveOptionIndex(0)
        // ^^^ THIS ABOVE FUCKING LINE GAVE ME A HEART ATTACK, ANXIETY,
        // STRESS, IMPOSTER SYNDROME AND EVERY OTHER MENTAL CONDITIONS
        // YOU CAN IMAGINE WHEN YOU TRY TO DEBUG SOMETHING AND YOU CAN'T
        // EVEN FIGURE OUT HOW THE ACTUAL FUCK THERE ARE INFINITE CALLS!!!

        optionsView = (
          <DropdownSingleSelect
            optionsList={options}
            setScoreFunction={setScoreToAdd}
            setActiveOptionId={setActiveOptionIndex}
          />
        )
        break
      default:
        optionsView = null
        break
    }

    return (
      <div className="question-container">
        <p className="question-main-text">
          {`${currentQuestionIndex + 1}. ${questionText}`}
        </p>
        {optionsView}
      </div>
    )
  }

  return (
    <div className="question-bg-container">
      {renderQuestion()}
      {isNextQuestionAvailable && renderNextQuestionButton()}
    </div>
  )
}

export default Question
