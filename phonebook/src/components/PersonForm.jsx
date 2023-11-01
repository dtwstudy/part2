const PersonForm = ({newName,newNumber,changeName,changeNumber ,addPerson}) =>{
    return (
        <div>
        <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={changeName} />
        
        </div>
        <div>
        number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

        </div>
    )
}
export default PersonForm