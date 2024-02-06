const Persons = ({persons,onDelete}) => {
    const deletePerson = (person) =>{
     const ask =  confirm(`Delete ${person.name} `)
    if(ask) onDelete(person.id)
    }
    return (
         <div>
            <ul>
      {persons.map(person=>
        <li key={person.id}>{person.name} {person.number}  <button onClick={()=>deletePerson(person)} >delete</button></li>
        )}
    </ul>
         </div>
    )
}

export default Persons