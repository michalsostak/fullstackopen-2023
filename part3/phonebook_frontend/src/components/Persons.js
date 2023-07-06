const Persons = ({ persons, nameFilter, handleRemove }) => (
     persons
          .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .map(person =>
               <div key={person.name}>{person.name} {person.number}
                    <button onClick={(e) => handleRemove(e, person.id)}>Delete</button>
               </div>            
          )
)

export default Persons