import {MdError} from 'react-icons/md'

import DropdownSingleSelect from './DropdownSingleSelect'
import ImageMultiSelect from './ImageMultiSelect'
import TextMultiSelect from './TextMultiSelect'

import './index.css'

const Question = props => {
  const {
    nextQuestionFunction,
    questionData,
    currentQuestionIndex,
    totalQuestions,
    setScoreFunc,
    activeOptionIndex,
    setActiveOptionIndex,
  } = props
  const {questionText, optionsType, options} = questionData

  const isNextQuestionAvailable = currentQuestionIndex < totalQuestions - 1

  const onClickNext = () => {
    nextQuestionFunction()
  }

  const renderNextQuestionButton = () => (
    <button
      type="button"
      onClick={onClickNext}
      className="next-question-button"
    >
      Next Question
    </button>
  )

  const renderQuestion = () => {
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
                setScoreFunc={setScoreFunc}
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
                setScoreFunc={setScoreFunc}
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
        //
        // Friendly reminder to never call any state functions directly.
        // EVEN if they are from a different component.

        optionsView = (
          <DropdownSingleSelect
            optionsList={options}
            setScoreFunction={setScoreFunc}
            setActiveOptionIndex={setActiveOptionIndex}
            activeOptionIndex={activeOptionIndex}
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

  const renderDropdownInfoChip = () => (
    <div className="question-dropdown-info">
      <MdError className="question-dropdown-info-icon" />
      <p className="question-dropdown-info-text">
        First option is selected by default
      </p>
    </div>
  )

  return (
    <div className="question-bg-container">
      {renderQuestion()}
      <div className="question-bottom-container">
        {optionsType === 'SINGLE_SELECT' && renderDropdownInfoChip()}
        {isNextQuestionAvailable && renderNextQuestionButton()}
      </div>
    </div>
  )
}

export default Question
