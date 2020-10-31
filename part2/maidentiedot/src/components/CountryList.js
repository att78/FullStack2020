import React from 'react'
import Country from '../components/Country'

const CountryList = ({ countries }) => {

    const list = countries

    console.log(list)

    const results = () => list.map(country => <Country key={country.name} name={country.name} />)



    return (
        <div>
            {results()}
        </div>

    )

}

export default CountryList