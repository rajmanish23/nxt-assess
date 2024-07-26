import {useState, useEffect, useContext, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Error from './sub_components/Error'
import Question from './sub_components/Question'
import TimerProgress from './sub_components/TimerProgress'

import ScoreContext from '../../context/ScoreContext'

import './index.css'

const apiStatusConsts = {
  initial: 0,
  loading: 1,
  success: 2,
  failure: 3,
}

const Assessment = ({history}) => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConsts.initial,
    questionsList: null,
    totalQuestions: null,
    errorMsg: null,
  })
  const [questionsProgressList, setQuestionsProgressList] = useState([])
  const [questionSelectedOptions, setQuestionSelectedOptions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [previousScoreAddtion, setPreviousScoreAddition] = useState(0)
  const [currentTime, setCurrentTime] = useState(600)
  const [score, setScore] = useState(0)

  const {setContextScore, setTimeRemaining} = useContext(ScoreContext)

  const timerId = useRef(null)

  // fetching data from api
  const getData = async () => {
    setApiResponse({
      status: apiStatusConsts.loading,
      questionsList: null,
      totalQuestions: null,
      errorMsg: null,
    })
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const data = await response.json()
    if (response.ok) {
      const questionsList = data.questions
      const updatedData = questionsList.map(eachObj => {
        const {options} = eachObj
        const optionsType = eachObj.options_type
        // changing name case of each options...
        const updatedOptions = options.map(eachOptObj => {
          const isCorrect = eachOptObj.is_correct === 'true'
          if (optionsType === 'IMAGE') {
            return {
              id: eachOptObj.id,
              text: eachOptObj.text,
              imageUrl: eachOptObj.image_url,
              isCorrect,
            }
          }
          return {
            id: eachOptObj.id,
            text: eachOptObj.text,
            isCorrect,
          }
        })
        return {
          id: eachObj.id,
          questionText: eachObj.question_text,
          optionsType,
          options: updatedOptions,
        }
      })
      setApiResponse({
        status: apiStatusConsts.success,
        questionsList: updatedData,
        totalQuestions: data.total,
        errorMsg: null,
      })
    } else {
      setApiResponse({
        status: apiStatusConsts.failure,
        questionsList: null,
        totalQuestions: null,
        errorMsg: data.error_msg,
      })
    }
  }

  const endAssessment = () => {
    setTimeRemaining(currentTime)
    setContextScore(score)
    history.replace('/results')
  }

  useEffect(() => {
    getData()
    timerId.current = setInterval(() => {
      setCurrentTime(prev => prev - 1)
    }, 1000)
    return () => {
      clearInterval(timerId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // initialising question options storage thing
  useEffect(() => {
    for (let i = 0; i < apiResponse.totalQuestions; i++) {
      setQuestionSelectedOptions(prev => [...prev, -1])
    }
  }, [apiResponse.totalQuestions])

  // checks whether timer has reached 0 or not.
  useEffect(() => {
    if (currentTime > 0) return
    history.replace('/results')
  }, [currentTime, history])

  // initialising questions progress list thing
  useEffect(() => {
    const totalNum = apiResponse.totalQuestions
    let i = 0
    while (i < totalNum) {
      setQuestionsProgressList(prev => [...prev, {id: uuidv4(), status: false}])
      i += 1
    }
  }, [apiResponse.totalQuestions])

  const retryAPI = () => {
    getData()
  }

  const setNextQuestionIndex = () => {
    if (currentQuestion >= apiResponse.totalQuestions - 1) {
      return
    }
    setCurrentQuestion(prev => prev + 1)
    setPreviousScoreAddition(0)
  }

  const setCurrentQuestionAttempt = isAttempted => {
    const updatedProgressList = questionsProgressList.map(
      (eachQuestion, index) => {
        if (index === currentQuestion) {
          return {...eachQuestion, status: isAttempted}
        }
        return eachQuestion
      },
    )
    setQuestionsProgressList(updatedProgressList)
  }

  const setActiveOptionIndex = optionIndex => {
    const updatedOptionsStorage = questionSelectedOptions.map((e, index) => {
      if (index === currentQuestion) {
        return optionIndex
      }
      return e
    })
    setQuestionSelectedOptions(updatedOptionsStorage)
  }

  // TODO: Fix the scoring function. It does not properly update scores when you change to a question via that selector/progress thing.
  const updateScore = (newScoreAddition, optionId, isAttempted) => {
    console.log(optionId, questionSelectedOptions[currentQuestion])
    if (optionId === questionSelectedOptions[currentQuestion]) return
    // currentScore = currentScore - previousAddition
    // currentScore = currentScore + newAddition
    const updatedScore = score - previousScoreAddtion + newScoreAddition
    setActiveOptionIndex(optionId)
    setScore(updatedScore)
    setPreviousScoreAddition(newScoreAddition)
    setCurrentQuestionAttempt(isAttempted)
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderMainView = () => (
    <div className="assessment-content-bg-container">
      <Question
        questionData={apiResponse.questionsList[currentQuestion]}
        nextQuestionFunction={setNextQuestionIndex}
        currentQuestionIndex={currentQuestion}
        totalQuestions={apiResponse.totalQuestions}
        setScoreFunc={updateScore}
        activeOptionIndex={questionSelectedOptions[currentQuestion]}
        setActiveOptionIndex={setActiveOptionIndex}
      />
      <TimerProgress
        endAssessment={endAssessment}
        currentTime={currentTime}
        questionsProgressList={questionsProgressList}
        currentQuestionIndex={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  )

  let viewToRender = null
  switch (apiResponse.status) {
    case apiStatusConsts.success:
      viewToRender = renderMainView()
      break
    case apiStatusConsts.failure:
      viewToRender = <Error retryFunc={retryAPI} />
      break
    case apiStatusConsts.loading:
      viewToRender = renderLoader()
      break
    default:
      viewToRender = null
      break
  }

  return (
    <div className="global-bg-container">
      <Header />
      <div className="assessment-bg-container">{viewToRender}</div>
    </div>
  )
}

export default Assessment
