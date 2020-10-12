import React from 'react';
import ReactDOM from 'react-dom';

// Header komponenttiin otetaan vain alkuperäisen taulukon name-tunniste sisään.
const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

//esimerkki map funktion
const Content = ({ parts }) => {
  const answer = () => parts.map(part =>
    <Part key={part.id} part={part} />
  )
  return (
    <div>
      {answer()}
    </div>)
}


const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// esimerkki reduce funktion käytöstä
function Total({ parts }) {

  const sum = parts.reduce((total, lesson) => {
    return (total + lesson.exercises);
  }, 0);

  return (
    <p>Total of exercises is {sum}</p>
  );
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //console.log(course)
  return (
    <div>
      <h1>List of course content</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))