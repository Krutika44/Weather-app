import React, {useEffect, useState} from "react";
import "./css/style.css";
import Clock from "react-live-clock";

const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  };

const Weatherr = () => 
{

    const [city,setCity] = useState(null);
    const[country, setCountry]=useState(null);
    const [search, setSearch] = useState("Mumbai");
    const [weather, setWeather] = useState(null);
    const [wind, setWind] = useState(null);
     

    useEffect(() => {
        const fetchApi = async() => 
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=1ed76eb023c302eff02f7a46b73bb08a`
            const response = await fetch(url);

            const resJson = await response.json();
            setCity(resJson.main);
            setCountry(resJson.sys);
            setWeather(resJson.weather);
            setWind(resJson.wind);                              
        };
        fetchApi();
    }, [search])

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type = "search"
                           value={search}
                           placeholder="Search.."
                           className="inputField"
                           onChange = { (event) =>{ setSearch(event.target.value)}} />
                </div>
                {
                    !city ? (
                                <p className="error">Sorry, No Data Found!</p>
                            ):
                            (
                                <div>
                                    <div className="location-box">
                                        <p className="location"> {search}, {country.country}</p>                                            
                                        <p className="temp">{city.temp}° </p>
                                    </div>
                                    <p className="current-date">{dateBuilder(new Date())}</p>
                                    
                                    <div className="current-time">
                                        <p>Updated on <Clock format="h:mm A" interval={1000} ticking={true} hour12={true} /> </p>
                                    </div> 

                                    <div className="weather-desc">{weather[0].main}</div>
                                    <br></br>

                                    <img src={require('./images/clear.png')} id ="feels-like-icon" alt="Feels like"/> 
                                    <div className="feels-like">Feels Like: &nbsp; &nbsp;&nbsp;{city.feels_like}°C </div>

                                    <img src={require('./images/wind.png')} id ="wind-icon" alt="Wind"/> 
                                    <div className="wind"> Wind: &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{wind.speed} km/hr </div>

                                    <img src={require('./images/humidity.png')} id ="humidity-icon" alt="Humidity"/> 
                                    <div className="humidity"> Humidity: &nbsp; &nbsp;&nbsp;&nbsp;{city.humidity}%</div>

                                    <img src={require('./images/temperature.png')} id ="mintemp-icon" alt="Minimum Temperatur"/> 
                                    <div className="tempmin">Min Temp: &nbsp; &nbsp;&nbsp;{city.temp_min}°C</div>

                                    <img src={require('./images/temperature.png')} id ="maxtemp-icon" alt="Maximum Temperatur"/> 
                                    <div className="tempmax">Max Temp: &nbsp; &nbsp;&nbsp;{city.temp_max}°C</div>
                                </div>
                                    
                            )
                }

                {weather && weather[0].main === 'Sunny' ? 
                (
                    <div>
                        <img alt="sunny" id="icon" src={require('./images/sunny.png') } />
                    </div>
                ) : null
                } 

                {weather && weather[0].main === 'Haze' ? 
                (
                    <div>
                        <img alt="haze" id="icon" src={require('./images/haze.png') } />
                    </div>
                ) : null
                } 

                {weather && weather[0].main === 'Clear' ? 
                (
                    <div>
                        <img alt="haze" id="icon" src={require('./images/clear.png') } />
                    </div>
                ) : null
                } 

                {weather && weather[0].main === 'Clouds' ? 
                (
                    <div>
                        <img alt="haze" id="icon" src={require('./images/cloudy-day.png') } />
                    </div>
                ) : null
                } 

                {weather && weather[0].main === 'Rain' ? 
                (
                    <div>
                        <img alt="haze" id="icon" src={require('./images/raining.png') } />
                    </div>
                ) : null
                }

                {weather && weather[0].main === 'Snow' ? 
                (
                    <div>
                        <img alt="haze" id="icon" src={require('./images/snow.png') } />
                    </div>
                ) : null
                } 
            </div>
        </>
    )
}

export default Weatherr;