import {useState, useEffect} from 'react'

import Header from '../Header'
import Error from './sub_components/Error'
import Question from './sub_components/Question'
import TimerProgress from './sub_components/TimerProgress'

const apiStatusConsts = {
  initial: 0,
  loading: 1,
  success: 2,
  failure: 3,
}

const Assessment = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConsts.initial,
    questionsList: null,
    totalQuestions: null,
    errorMsg: null,
  })
  const [questionsProgressList, setQuestionsProgressList] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // fetching data from api
  useEffect(() => {
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
          const options = eachObj.options
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
    getData()
  }, [])

  // initialising questions progress list thing
  useEffect(() => {
    const totalNum = apiResponse.totalQuestions
    for (let i = 0; i < totalNum; i++) {
      setQuestionsProgressList(prev => [...prev, false])
    }
  }, [apiResponse.totalQuestions])

  return (
    <div className="global-bg-container">
      <Header />
      <h1>Assessment Route</h1>
    </div>
  )
}

export default Assessment
