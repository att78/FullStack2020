import React from 'react';
import ReactDOM from 'react-dom';

// Header komponenttiin otetaan vain alkuperäisen taulukon name-tunniste sisään.
const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

//esimerkki map funktion käytöstä
const Content = ({ parts }) => {
  const answer = () => parts.map(part =>
    <Part key={part.id} part={part} />
  )
  return (
    <div>
      {answer()}
    </div>)
}

// esimerkki reduce funktion käytöstä
function Total({ parts }) {

  const sum = parts.reduce((total, lesson) => {
    return (total + lesson.exercises);
  }, 0);

  return (
    <p>Number of exercises {sum}</p>
  );
}


const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}



const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

  )

}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  console.log(course)
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))