import { useState ,useEffect } from 'react'
import Countries from '/services/countries'

const List = ({countries}) => {
  if(countries.length > 10){
    return (
      <div>
        <p>Too many matches specify another filter</p>
      </div>
    )
  }
  else if(countries.length == 1){
   
    return (
      <div>
        <ul>
        {countries.map(item =>
        <li key={item.capital}>
         <h3> {item.country} </h3> 
         <p>capital {item.capital} </p>
         <p>area {item.area} </p>
        <p>languages</p>
        <p>{item.languages.ara}</p>
        <img src={item.flag} width="200" />
        <h4>Weather in {item.capital}</h4>
          </li>
        )}
        </ul>
      </div>
    )
  }

  else {
  return (
      <div>
     
     <ul>
        {countries.map(country =>
        <li key={country.capital}>{country.country}  <button type='button' >show</button> </li>
        )}
        </ul>
      </div>
    )
        }
  }

function App() {
  
  const [countries ,setContries] = useState([])
  const [val ,setvalue] = useState()


  const loadFromApi = (val) =>{
    Countries.getCountries().then(res=>{
      
     const items = res.map(item=>{
      return {
        country : item.name.common,
        capital : item.capital,
        area : item.area,
        languages : item.languages,
        flag : item.flags.png
      }
      })
      const allCountries =  items.filter(item=> item.country.includes(val))
     
      setContries(allCountries)
      //console.log(allCountries)
    })
  }
  //useEffect(loadFromApi,[])

  const SearchCountry = (event)=>{
    loadFromApi(event.target.value)
   }

  return (
    <>
      <div>
        <input value={val} onChange={SearchCountry} />
        <List countries={countries}/>
      </div>
    </>
  )
}

export default App
