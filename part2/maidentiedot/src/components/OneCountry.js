import React from 'react'

const OneCountry = (props) => {

    const country = props.country

    const name = country.name
    const capital = country.capital
    const languages = country.languages
    const spokenLanguages = () => languages.map(language => <li key={language.name}>{language.name}</li>)
    const flagUrl = country.flag
    const population = country.population


    return (
        <div>
            <h2>{name}</h2>

            <p>Capital city: {capital}</p>
            <p>Total population: {population}</p>

            <h3>Languages</h3>
            {spokenLanguages()}
            <p></p>
            <img src={flagUrl} alt="country flag" height="150"></img>

        </div>
    )

}

export default OneCountry
