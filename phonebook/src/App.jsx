import { useState , useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
import Phonebook from './services/phonebook'
import Notification from './components/Notification'


function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [searchFlag, setFlag] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [color, setCls] = useState('')

  const loadFrom = () =>{
    Phonebook.getAllPersons().then(initPerson=>{
      setPersons(initPerson)
    })
  }
  useEffect(loadFrom,[])

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
      name : newName,
      number : newNumber
     }

     if(persons.every((person)=> person.name != newPerson.name)){
      Phonebook.createPersons(newPerson).then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added to phonebook ${returnedPerson.name}`)
        setCls('successful')
        setTimeout(() => {
          setErrorMessage("")
          setCls("")
        }, 2000)
        setNewName('')
        setNewNumber('')
       
      })
      
      
     }
     else{
      const msg=`${newPerson.name} is already added to phonebook replace the old number with new one?`
     const ask = confirm(msg)
     if(ask){
      const newNumber = prompt("Input new number")
      const user = persons.find(person => person.name === newName)
      user.number = newNumber
      Phonebook.updateNumber(user).then(updatePerson=>{
       const newData  = persons.map((person)=>{
       return person.id !== user.id ? person : updatePerson
       })
       setErrorMessage(`Updated number in phonebook ${newNumber}`)
       setCls('successful')
       setTimeout(() => {
        setErrorMessage("")
        setCls("")
      }, 2000)
       //console.log(newData)
       setPersons(newData)
      })

     }
     }
     
  }
  const deleteData = (id) =>{
    Phonebook.deletePerson(id).then(deleteUser=>{
     const newPersons = persons.filter((person)=> person.id !== id)
     setPersons(newPersons)
    }).catch(err=>{
      setErrorMessage(`Infromation of  has alredy been removed from server`)
       setCls('error')
       setTimeout(() => {
        setErrorMessage("")
        setCls("")
      }, 2000)
      console.log("cant delete")
    })
     
  }

  return (
    <>
     <div>
     <Notification message={errorMessage} color={color} />
     <h2>Phonebook</h2>
      <Filter search={search} searchChange={searchChange} />
     
      <h3>Add a new</h3>
     <PersonForm  addPerson={addPerson} newName={newName} newNumber={newNumber} changeName={changeName} changeNumber={changeNumber} />
      <h2>Numbers</h2>
    <Persons  persons={allPersons} onDelete={deleteData} />
    </div>
    
    </>
  )
}

export default App
