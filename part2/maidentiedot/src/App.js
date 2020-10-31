import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import OneCountry from './components/OneCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  //const [filtCountries, setFiltCountries] = useState([])

  const hook = () => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)

      })

  }

  useEffect(hook, [])


  const handleFilterChange = (event) => {

    setFilter(event.target.value)

  }

  const shownCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const shownLength = shownCountries.length

  if (shownLength > 10) {
    return (


      <div>
        <h1>Filter countries</h1>
        <Filter filter={filter}
          handleFilterChange={handleFilterChange} />



        <p>More than 10 countries. Make more precise filtering</p>
      </div>
    )

  } else if (shownLength === 0) {
    return (
      <div>
        <h1>Filter countries</h1>
        <Filter filter={filter}
          handleFilterChange={handleFilterChange} />



        <p>Zero countries. Make more realistic filtering</p>
      </div>
    )
  } else if (shownLength === 1) {
    return (
      <div>
        <h1>Filter countries</h1>
        <Filter filter={filter}
          handleFilterChange={handleFilterChange} />

        <h2>Country</h2>
        <OneCountry country={shownCountries[0]} />


      </div>

    )

  }


  else {
    return (
      <div>
        <h1>Filter countries</h1>
        <Filter filter={filter}
          handleFilterChange={handleFilterChange} />

        <h2>Countries</h2>
        <CountryList countries={shownCountries} />



      </div>
    );
  }



}

export default App;
