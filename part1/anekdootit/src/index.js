import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)


  

  return (
    <div>

      <h1> Choose anecdote:</h1>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="anecdote" />
      <Button handleClick={() => points[selected] = points[selected] + 1} text="vote" />

      <p>Chosen anecdote is:</p>
      {props.anecdotes[selected]}

      <p>has {points[selected]} votes </p>




    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
 
const points = [0, 0, 0, 0, 0, 0]




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
