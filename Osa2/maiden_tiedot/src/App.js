import React, { useState, useEffect} from 'react';
import axios from 'axios'

const Countries = ( props ) => {
  console.log(props.name)
  if(props.name !== undefined){
   return (
     <div>
      <form onClick={props.getCountry} value={props.name}>
      {props.name} 
        <button type='button'>show</button>
      </form>
     </div> 
   )
  }
  return(
    <p></p>
  )
}

const Land = ( {land, weather, condition} ) => {
  return (
    <div>
      <h2>{land.name}</h2>
      <p>capital {land.capital}</p>
      <p>population {land.population}</p>
      <h5>languages</h5>
      <ul>{land.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul><img src={land.flag} alt='flag' style={{width:200}}/>
      <h2>Weather in {land.capital}:</h2>
      <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions}/>
      <p><strong>wind:</strong> {weather.wind_speed} kph direction {weather.wind_dir}</p>
    </div>
    )
} 

const App = () => {
  const [lands, setLands] = useState([])
  const [filterData, setFilterData] = useState('')
  const [show, setShow] = useState(true)
  const [weather, setWeather] = useState([])
 
  useEffect(( ) => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('response fulfilled')
        setLands(response.data)
      })
  }, [])

  const filterLands = show
  ? lands
  : lands.filter(land => land.name.toLowerCase().includes(filterData.toLowerCase()))
  
  const rows = () =>  {
    const filtered = filterLands.map(land => 
    <Countries 
      key={land.name}
      name={land.name} 
      getCountry={() => getCountry(land.name)} /> )
    if(filtered.length > 10) {
      return(
        <p>Too many matches, specify another filter</p>
      )
    } else if (filtered.length === 1) {
        const land = filterLands.find(land => land)
        console.log(land)
        if (weather.length === 0) {
          axios
          // the next url needs a valid key, otherwise this application is not working properly.
          .get(`http://api.weatherstack.com/current?access_key=&query=${land.capital}`)
          .then(response => {
            console.log(response.data.current)
            setWeather(response.data.current)
          })
        }
      return (
        filterLands.map(land =>
        <Land key={land.name} land={land} weather={weather}/>)
      )
    }
    return (
      filtered
    )  
  }
  
  const getCountry = (name) => {
    setFilterData(name)
    setWeather([])
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterData(event.target.value)
    if (event.target.value !== '' && show === true) {
      setShow(!show)
    } else if (event.target.value === '') {
      setShow(show)
    }
  }

  return(
    <div>
      <form>
        find countries: <input value={filterData} onChange={handleFilter} />
      </form>
      { rows() }
    </div>
  )
}

export default App;
