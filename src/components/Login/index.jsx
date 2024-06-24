import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

import logo from '../../assets/login-page-logo.png'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onChangeUpdateUsername = e => {
    setUsername(e.target.value)
  }

  const onChangeUpdatePassword = e => {
    setPassword(e.target.value)
  }

  const onChangeToggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {
      expires: 3,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = errMsg => {
    setErrorMessage(errMsg)
    setShowError(true)
    setPassword('')
    setUsername('')
    console.log(errMsg)
  }

  const submitForm = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <>
      <label className="login-input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="login-input-fields"
        onChange={onChangeUpdateUsername}
        value={username}
      />
    </>
  )

  const renderPasswordField = () => (
    <>
      <label className="login-input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        id="password"
        className="login-input-fields"
        onChange={onChangeUpdatePassword}
        value={password}
      />
      <label className="login-showpassword-label">
        <input
          type="checkbox"
          value="showPassword"
          className="login-checkbox-input-field"
          checked={showPassword}
          onChange={onChangeToggleShowPassword}
        />
        Show Password
      </label>
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg-container">
      <form className="login-form-container" onSubmit={submitForm}>
        <img className="login-logo" src={logo} alt="login website logo" />
        <div className="login-input-container">{renderUsernameField()}</div>
        <div className="login-input-container">{renderPasswordField()}</div>
        <div className="login-button-error-container">
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="login-error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default Login
