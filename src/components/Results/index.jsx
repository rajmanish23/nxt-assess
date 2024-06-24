import Header from '../Header'

import './index.css'

import inTimeImage from '../../assets/results-in-time-image.png'
import notInTimeImage from '../../assets/results-not-in-time-image.png'

const Results = ({time = 0, score = 0, history}) => {
  const onClickOpenAssessment = () => {
    history.push('/assessment')
  }

  const imageToUse = time === 0 ? notInTimeImage : inTimeImage

  return (
    <div className="global-bg-container">
      <Header />
      <div></div>
    </div>
  )
}

export default Results
