import FindCountries from './components/FindCountries'
import Countries from './components/CountrySearch'
import CountriesService from './services/countries'
import { useState, useEffect } from 'react'

const App = () => {

  const [allCountries, setAllCountries] = useState(null)
  const [countryFilter, setCountryFilter] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    CountriesService
      .getAll()
      .then(fetchedCountries => setAllCountries(fetchedCountries)
      )
  }, [])

  const handleFilterChange = (e) => {
    const countryName = e.target.value
    setCountryFilter(countryName)
    setShowCountry(null)
  }

  const handleShow = (e, country) => {
    setShowCountry(country)
  }

  return (
    <div>
      <FindCountries countryFilter={countryFilter} handleFilterChange={handleFilterChange} />
      <Countries allCountries={allCountries} countryFilter={countryFilter} showCountry={showCountry} handleShow={handleShow} />
    </div>
  )
}

export default App;
