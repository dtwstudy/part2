import { useState, useEffect } from 'react'
import Countries from '/services/countries'

const Weather = ({ item }) => {
  const [flag, setVal] = useState(false)
  const [data, setData] = useState({})

  const loadWeatherApi = () => {
    Countries.getWeather(item.capital).then(res => {
      setData({ temp: res.main.temp, wind: res.wind.speed, img: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png` })


    })

  }


  useEffect(loadWeatherApi, [])

  return (
    <div>
      <h4>Weather in {item.capital}</h4>

      <p>temperature {(data.temp - 273).toFixed(2)} Celcius</p>
      <img src={data.img} />
      <p>wind {data.wind} m/s</p>
    </div>
  )
}

const List = ({ countries, onView }) => {

  const onViewDetails = (country) => {
    onView(country)
  }

  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches specify another filter</p>
      </div>
    )
  }
  else if (countries.length == 1) {

    return (
      <div>
        <ul>
          {countries.map(item =>
            <li key={item.capital}>
              <h3> {item.country} </h3>
              <p>capital {item.capital} </p>
              <p>area {item.area} </p>
              <p>languages</p>
              <ul>
                {Object.entries(item.languages).map(([k, v]) => (<li key={k}>{v}</li>))}
              </ul>

              <img src={item.flag} width="200" />
              <Weather item={item} />

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
            <li key={country.capital}>{country.country}  <button type='button' onClick={() => onViewDetails(country.country)} >show</button> </li>
          )}
        </ul>
      </div>
    )
  }
}

function App() {

  const [countries, setContries] = useState([])
  const [val, setvalue] = useState()


  const loadFromApi = (val) => {
    Countries.getCountries().then(res => {

      const items = res.map(item => {
        return {
          country: item.name.common,
          capital: item.capital,
          area: item.area,
          languages: item.languages,
          flag: item.flags.png,
          latlng: item.latlng
        }
      })
      const allCountries = items.filter(item => item.country.toLowerCase().includes(val.toLowerCase()))

      setContries(allCountries)

    })
  }
  //useEffect(loadFromApi,[])

  const SearchCountry = (event) => {
    loadFromApi(event.target.value)
  }

  const changeView = (country) => {
    const res = countries.filter((c) => c.country == country)
    setContries(res)
  }

  return (
    <>
      <div>
        <form>
        <input value={val} onChange={SearchCountry} />
        </form>
      
        <List countries={countries} onView={changeView} />
      </div>
    </>
  )
}

export default App
