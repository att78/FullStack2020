import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
  console.log(props)

    return (
      <div> <h2>statistics</h2>
        <p></p>
        <table><tbody>
          <Stat text="good " value={props.good} />
          <Stat text="neutral " value={props.neutral} />
          <Stat text="bad " value={props.bad} />
        </tbody>
        </table>
      </div>
    )
  }


function Stat(props) {
  return (
    <tr><td>{props.text} </td><td>{props.value}</td></tr>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




function App() {
  // save buttons to their own states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give us feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)