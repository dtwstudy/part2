import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'


function App() {
  const [persons, setPersons] = useState([ { id:1, name: 'Arto Hellas', number: '120-345678' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [searchFlag, setFlag] = useState(true)

  const changeName = (event) =>{
     setNewName(event.target.value)
  }
  const changeNumber = (event) =>{
    setNewNumber(event.target.value)
 }

 const searchChange = (event) =>{
  setSearch(event.target.value)
  setFlag(false) 
}

 const allPersons = searchFlag ? persons: persons.filter((person)=> person.name.includes(search))

  const addPerson = (event) => {
    event.preventDefault()
     const newPerson = {
      id : persons.length + 1,
      name : newName,
      number : newNumber
     }

     if(persons.every((person)=> person.name != newPerson.name)){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
     }
     else{
      const msg=`${newPerson.name} is already added phonebook`
      alert(msg)
     }
     
  }

  return (
    <>
     <div>
     <h2>Phonebook</h2>
      <Filter search={search} searchChange={searchChange} />
     
      <h3>Add a new</h3>
     <PersonForm  addPerson={addPerson} newName={newName} newNumber={newNumber} changeName={changeName} changeNumber={changeNumber} />
      <h2>Numbers</h2>
    <Persons  persons={allPersons}/>
    </div>
    
    </>
  )
}

export default App
