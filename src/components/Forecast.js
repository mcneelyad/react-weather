import React, { useState, useEffect } from 'react';

import dotenv from  'dotenv';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

const Forecast = () => {
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');

    // API KEY AND URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${key}`;

    // Side effect
    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data));
        console.log(apiData);
    }, [apiUrl]);

    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (getState.length === 0) {
            setError('Please enter a location');
        } else {
            setError('');
        }
        setState(getState);
    };

    const kelvinToFarenheit = (kelvin) => {
        const celsius = kelvin - 273;
        return Math.floor(celsius * (9 / 5) + 32);
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div className="location-form">
                    <label className="heading">
                        Enter a location
                    </label>
                    <br /><br />
                    <input
                        type="text"
                        id="location-input"
                        onChange={inputHandler}
                        value={getState}
                    />
                    <br /><br />
                    <button variant="contained" className="button mt-2" onClick={submitHandler}>
                        Search
                    </button>
                    <br /><br />
                </div>

                {error && <div className="error-message">{error}</div>}
                <div className="conditions">
                    {apiData.main &&
                        <Card className="conditions">
                            <CardContent>
                                <img
                                    src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                                    alt="Weather Status Icon"
                                    className="weather-icon"
                                />
                                <div className="temp-conditions">
                                    <Typography>Current Temperature: {kelvinToFarenheit(apiData.main.temp)}&deg;F</Typography>
                                    <Typography>Feels Like: {kelvinToFarenheit(apiData.main.feels_like)}&deg;F</Typography>
                                    <Typography>Low: {kelvinToFarenheit(apiData.main.temp_min)}&deg;F</Typography>
                                    <Typography>High: {kelvinToFarenheit(apiData.main.temp_max)}&deg;F</Typography>
                                    <Typography>Conditions: {apiData.weather[0].description}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </div>
            </div>
        </div>
    );
}
export default Forecast;
