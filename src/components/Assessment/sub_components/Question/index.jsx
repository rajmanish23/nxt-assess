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
  } = props

  const isNextQuestionAvailable = currentQuestionIndex < totalQuestions - 1

  const renderNextQuestionButton = () => (
    <button type="button" onClick={nextQuestionFunction}>
      next question
    </button>
  )

  const renderQuestion = () => {
    const {questionText, optionsType, options} = questionData

    let optionsView = null
    switch (optionsType) {
      case 'DEFAULT':
        optionsView = (
          <ul className="question-options-list-container">
            {options.map(eachOption => (
              <TextMultiSelect optionDetails={eachOption} />
            ))}
          </ul>
        )
        break
      case 'IMAGE':
        optionsView = (
          <ul className="question-options-list-container">
            {options.map(eachOption => (
              <ImageMultiSelect optionDetails={eachOption} />
            ))}
          </ul>
        )
        break
      case 'SINGLE_SELECT':
        optionsView = <DropdownSingleSelect optionDetails={options} />
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
