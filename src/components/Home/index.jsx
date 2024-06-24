import Header from '../Header'

import './index.css'

import image from '../../assets/home-image.png'

const Home = props => {
  const onCLickOpenAssessment = () => {
    const {history} = props
    history.replace('/assessment')
  }

  const renderInstructionsCard = () => (
    <div className="home-instructions-card">
      <h1 className="home-instructions-heading">Instructions</h1>
      <ul className="home-instructions-list-container">
        <li className="home-instructions-list-item">
          <span className="home-instructions-list-item-main-text">
            Total Questions
          </span>
          : 10
        </li>
        <li className="home-instructions-list-item">
          <span className="home-instructions-list-item-main-text">
            Types of Questions
          </span>
          : MCQs
        </li>
        <li className="home-instructions-list-item">
          <span className="home-instructions-list-item-main-text">
            Duration
          </span>
          : 10 Mins
        </li>
        <li className="home-instructions-list-item">
          <span className="home-instructions-list-item-main-text">
            Marking Scheme
          </span>
          : Every Correct response, get 1 mark
        </li>
        <li className="home-instructions-list-item">
          All the progress will be lost, if you reload during the assessment
        </li>
      </ul>
      <button
        type="button"
        className="home-instructions-button"
        onClick={onCLickOpenAssessment}
      >
        Start Assessment
      </button>
    </div>
  )

  return (
    <div className="global-bg-container">
      <Header />
      <div className="home-bg-container">
        <img className="home-image" src={image} alt="assessment" />
        {renderInstructionsCard()}
      </div>
    </div>
  )
}

export default Home
