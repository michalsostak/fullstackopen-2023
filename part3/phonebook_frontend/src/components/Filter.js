const Filter = ({ nameFilter, handleFilterChange }) => (
    <div>Filter shown with:
        <input
            value={nameFilter}
            onChange={handleFilterChange}
        />
    </div>
)

export default Filter