import React from 'react';


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

export default Course