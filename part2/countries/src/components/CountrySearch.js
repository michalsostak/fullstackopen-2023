import CountryDetails from "./CountryDetails"

const CountrySearch = ({ allCountries, countryFilter, showCountry, handleShow }) => {

    if (allCountries === null || allCountries === undefined) {
        return null
    }

    const filteredCountries = allCountries?.filter(c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    const filteredCountriesCount = Object.keys(filteredCountries).length;
    const tooMany = "Too many matches, specify another filter"

    if (filteredCountriesCount > 10) {
        return (
            <div>
                {tooMany}
            </div>
        )
    }


    if (filteredCountriesCount === 1 ) {
        return (
            <CountryDetails filteredCountry={filteredCountries[0]} />
        )
    }

    if (filteredCountriesCount > 1 && filteredCountriesCount < 11) {
        return (
            <div>
                {filteredCountries
                    .map(c =>
                        <div key={c.name.common}>
                            {c.name.common}
                            <button onClick={(e) => handleShow(e, c)}>show</button>
                            
                        </div>
                    )}
                {showCountry !== null && <CountryDetails filteredCountry={showCountry} />}
            </div>
        )
    }
}

export default CountrySearch