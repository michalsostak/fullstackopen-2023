import WeatherService from '../services/weather'
import { useState, useEffect } from 'react'

const CountryDetails = ({ filteredCountry }) => {

    const [weatherDetails, setWeatherDetails] = useState(null)

    const lat = filteredCountry?.capitalInfo?.latlng[0]
    const lon = filteredCountry?.capitalInfo?.latlng[1]

    useEffect(() => {
        WeatherService
            .getCurrentTemp(lat, lon)
            .then(weather => setWeatherDetails(weather)
            )
    }, [lat, lon])

    if (filteredCountry === null || filteredCountry === undefined || weatherDetails === null) {
        return
    }

    return (
        <>
            <h1>{filteredCountry.name.common}</h1>
            <div>capital {filteredCountry.capital[0]}</div>
            <div>area {filteredCountry.area}</div>
            <h2>languages:</h2>
            <ul>
                {Object.values(filteredCountry.languages)
                    .map(lang =>
                        <li key={lang}>
                            {lang}
                        </li>
                    )}
            </ul>
            <img src={filteredCountry.flags.png} alt="flag" />
            <h2>Weather in {filteredCountry.capital[0]}</h2>
            <div>temperature {weatherDetails?.main.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weatherDetails?.weather[0].icon}@2x.png`} alt="weather icon" />
            <div>wind {weatherDetails?.wind.speed} m/s</div>
        </>
    )
}

export default CountryDetails