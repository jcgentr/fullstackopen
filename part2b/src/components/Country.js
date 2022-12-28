import axios from "axios";
import { useEffect } from "react";

const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

export const Country = ({ country }) => {
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${WEATHER_API_KEY}`
      )
      .then((response) => console.log(response));
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <div>
        languages:{" "}
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          style={{ border: "5px solid black" }}
          src={country.flags.svg}
          alt="Country flag"
          width="300"
          height="100%"
        />
      </div>
      <div>
        <h2>Weather</h2>
      </div>
    </div>
  );
};
