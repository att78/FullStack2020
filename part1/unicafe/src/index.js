import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
  console.log(props)
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p></p>
      No feedback given
      </div>
    )
  } else {
    return (
      <div> <h2>statistics</h2>
        <p></p>
        
          <StatisticLine text="good " value={props.good} symbol =""/>
          <StatisticLine text="neutral " value={props.neutral} symbol =""/>
          <StatisticLine text="bad " value={props.bad} symbol ="" />
          <StatisticLine text="all " value={props.good + props.neutral + props.bad} symbol =""/>
          <StatisticLine text="average " value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} symbol =""/>
          <StatisticLine text="positive " value={(100 * (props.good + props.neutral)) / (props.good + props.neutral + props.bad)} symbol =" %" />

      </div>
    )
  }
}


const StatisticLine = (props) => {
  return (
  <div>{props.text} {props.value}{props.symbol}</div>
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