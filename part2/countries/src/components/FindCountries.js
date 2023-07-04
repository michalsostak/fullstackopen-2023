const FindCountries = ( {countryFilter, handleFilterChange }) => (
    <div>find countries 
        <input
            value={countryFilter}
            onChange={handleFilterChange}
        />
    </div>
)

export default FindCountries