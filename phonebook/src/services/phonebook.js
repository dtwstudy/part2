import axios from 'axios'
const baseUrl ="http://localhost:3001/persons"

const getAllPersons = () => {
const req = axios.get(baseUrl)
return req.then(res=> res.data).catch(res=>console.log(" error load all persons"))

}

const createPersons = (data) => {
    const req = axios.post(baseUrl,data)
   return req.then(res=> res.data ).catch(res=>console.log("error create person"))
    
    }

const deletePerson = (id) =>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const updateNumber = (newObj) =>{
    const req = axios.put(`${baseUrl}/${newObj.id}`,newObj)
    return req.then(res => res.data).catch(res=>console.log("error update person"))
}


export default {getAllPersons,createPersons ,deletePerson ,updateNumber}
