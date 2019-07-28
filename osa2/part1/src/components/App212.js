import React, { useState, useEffect } from 'react'
import axios from 'axios'

const restcountriesApi = "https://restcountries.eu/rest/v2/all"

const Country = ({ country, setCountryComps }) => {
    console.log("RENDERING COUNTRY", country);

    const onClick = (event) => { 
        console.log(country);       
        setCountryComps(<CountryX country={country} />);        
    }

    return (
        <div>
            <li>{country.name} <button onClick={onClick} id={country}>Show</button></li>
        </div>
    )
}

const CountryX = ({country}) => {

    const getLanguages = () => country.languages.map(language => <li>{language.name}</li>)     

    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population.toString()}</div>
            <h2>Languages</h2>
            <ul>{getLanguages()}</ul>
            <img width="150px" src={country.flag} alt={"FLAG"}/>
        </div>
    )
}

const App = (props) => {
    const [countries, setCountries] = useState([]);
    const [countriesShown, setCountriesShown] = useState([])
    const [countryComps, setCountryComps] = useState()

    useEffect(() => {
        axios
            .get(restcountriesApi)
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    const onChange = (event) => {
        const countriesFound = countries.filter(country => country.name.toUpperCase().includes(event.target.value.toUpperCase()));
        console.log(countriesFound.length);
        console.log(countriesFound);
        setCountriesShown(countriesFound);
        setCountryComps();
    }

    const rows = () =>
        countriesShown.map(country =>
            <Country
                key={country.name}
                country={country}
                setCountryComps={setCountryComps}
            />
        )        

    const showRows = () => {
        if (countriesShown.length === 1) {
            return <CountryX country={countriesShown[0]}/>
        } else if (countriesShown.length > 0 && countriesShown.length <= 10) {
            return rows()
        } else if (countriesShown.length === 0) {
            return "No matches found, specify another filter";
        } else {
            return "Too many matches, specify another filter";
        }
    }

    return (
        <div>APP212-214
            <div>
                Find countries:
                <input onChange={onChange} />
            </div>
            <div>
                {showRows()}
                {countryComps}
            </div>
        </div>
    )
}

export default App