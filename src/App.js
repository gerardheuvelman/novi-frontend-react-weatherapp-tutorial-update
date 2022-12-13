import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import axios from 'axios';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import { Routes, Route } from 'react-router-dom';
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelsius from "./helpers/kelvinToCelsius";

const apiKey = '15a9c6d1c16f33b78405bab2e9ed7cc2';

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false); // dit deed ik extra. komt niet treug in de elementen op de pagina.

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                console.log(response.data);
                setWeatherData(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (location) {
            fetchData();
        }
    }, [location]);

    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    {error &&
                        <span className="wrong-location-error">
              Oeps! Deze locatie bestaat niet
            </span>
                    }

                    <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3>{weatherData.name}</h3>
                    <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
                </>
            }
          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        <Routes>
                            <Route path="/" element={<TodayTab coordinates={weatherData.coord} />} />
                            <Route path="/komende-week" element={<ForecastTab coordinates={weatherData.coord}/>} />
                        </Routes>
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;