import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Country } from "./Country";

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries:
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCountry(null);
          }}
        />
      </div>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter.</div>
      ) : (
        <div>
          {filteredCountries.length === 1 ? (
            <Country country={filteredCountries[0]} />
          ) : (
            <div>
              <ul>
                {filteredCountries.map((country) => (
                  <li>
                    {country.name.common}{" "}
                    <button onClick={() => setCountry(country)}>show</button>
                  </li>
                ))}
              </ul>
              {country && <Country country={country} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
