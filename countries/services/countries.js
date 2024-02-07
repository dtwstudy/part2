import axios from 'axios'
const baseUrl ="https://studies.cs.helsinki.fi/restcountries/api/all"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
const token = import.meta.env.VITE_SOME_KEY

const getCountries = ()=>{
    const request = axios.get(baseUrl)
    return request.then(res=>res.data).catch(err=>console("api failed load"))
} 
const getWeather = (city)=>{
    const request = axios.get(`${apiUrl}?q=${city}&appid=${token}`)
    return request.then(res=>res.data).catch(err=>console("api failed load"))
} 

export default{ getCountries ,getWeather}