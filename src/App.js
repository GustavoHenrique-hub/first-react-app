import "./App.css";
// import Card from './Components/Card/card'
import { useState } from "react";
import TypeWeatherLogo from "./assets/typeweather-logo.svg";
import { useOnKeyPress } from "./hooks/useOnKeyPress";

function App() {

  const key = "b2213bc688da17e335540298fee4f0b7";

  const [stateTemperatura, setStateTemperatura] = useState();
  const [stateCity, setStateCity] = useState("");
  const [city, setCity] = useState();

  const callApi = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${stateCity}&lang=pt_br&appid=${key}&units=metric`;

    fetch(url)
      .then((resposta) => {
        return resposta.json();
      })
      .then((dadoTemperatura) => {
        console.log(dadoTemperatura);
        setStateTemperatura(dadoTemperatura.main.temp);
        setCity(dadoTemperatura.name);
      });

    setStateCity("");
  };

  useOnKeyPress(callApi, "Enter");
  return (
    <div className="App">
      <div className="image">
        <img src={TypeWeatherLogo} />
      </div>

    <div className="header">
    <p className="title">Boas vindas ao<a className="titleColored"> TypeWeather</a></p>
        <p className="textoHeader">Escolha um local para ver a previsão do tempo</p>
    </div>

      <div className="searchBar">
        <input
          className="inputText"
          type="text"
          placeholder="Buscar Local"
          value={stateCity}
          onChange={(event) => {
            setStateCity(event.target.value);
          }}
        />
        <button className="btnSubmit" onClick={callApi} />
      </div>
      <div className="response">
        <p className="texto">{city != null ? `${city}` : " "}</p>
        <p className="texto">{stateTemperatura != null ? `${stateTemperatura}°C` : " "}</p>
      </div>
    </div>
  );
}

export default App;
