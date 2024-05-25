import "./dashboard.css";
import { useOnKeyPress } from "../../hooks/useOnKeyPress";
import { useState, useTransition } from "react";
import TypeWeatherLogo from "../../assets/dashboardPage/btn-logo.svg";
import MoonLogo from "../../assets/dashboardPage/moon-icon.svg";
import Divider from "../../assets/dashboardPage/divider.svg";

import Termometer from "../../assets/dashboardPage/detailIcons/termometer.svg"
import Rain from "../../assets/dashboardPage/detailIcons/rain.svg"
import Wind from "../../assets/dashboardPage/detailIcons/wind.svg"
import Drop from "../../assets/dashboardPage/detailIcons/drop.svg"
import Sun from "../../assets/dashboardPage/detailIcons/sun.svg"

function Dashboard() {
  const key = "b2213bc688da17e335540298fee4f0b7";
  const detailKey = "f325bd9a5efd4399858165721242405";

  const [stateTemperatura, setStateTemperatura] = useState();
  const [stateTempMax, setStateTempMax] = useState();
  const [stateTempMin, setStateTempMin] = useState();
  const [stateWeather, setStateWeather] = useState();
  const [stateCity, setStateCity] = useState();
  const [stateTime, setStateTime] = useState();
  const [stateChanceOfRain, setStateChanceOfRain] = useState();
  const [stateFeelsLike, setStateFeelsLike] = useState();
  const [stateHumidity, setStateHumidity] = useState();
  const [stateUvIndex, setStateUvIndex] = useState();
  const [stateWindKm, setStateWindKm] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  



  //https://api.openweathermap.org/data/2.5/forecast?q=${stateCity}&lang=pt_br&appid=${key}&units=metric&cnt=40

  const callApi = () => {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stateCity}&lang=pt_br&appid=${key}&units=metric&`;
    let geocoderUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${stateCity}&lang=pt_br&appid=${key}`;
    let weatherDetailsUrl = `http://api.weatherapi.com/v1/forecast.json?key=${detailKey}&q=${stateCity}`
    fetch(weatherUrl)
      .then((resposta) => {
        return resposta.json();
      })
      .then((dadoTemperatura) => {
        console.log(dadoTemperatura);
        setStateTemperatura(dadoTemperatura.main.temp);
        setStateTempMax(dadoTemperatura.main.temp_max);
        setStateTempMin(dadoTemperatura.main.temp_min);
        setStateWeather(dadoTemperatura.weather[0].main);
      });

    fetch(geocoderUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((dataLocalization) => {
        console.log(dataLocalization);
        setCountry(dataLocalization[0].country);

        if (stateCity === dataLocalization[0].local_names) {
          setCity(dataLocalization[0].local_names);
        }
        setCity(dataLocalization[0].name);
        
      });

      fetch(weatherDetailsUrl)
      .then((response) => {
        return response.json();
      })
      .then((detailInfo) => {
        console.log(detailInfo);
        setStateFeelsLike(detailInfo.current.feelslike_c);
        setStateChanceOfRain(detailInfo.forecast.
          forecastday[0].day.daily_chance_of_rain);
        setStateHumidity(detailInfo.current.humidity);
        setStateUvIndex(detailInfo.current.uv);
        setStateWindKm(detailInfo.current.wind_kph);
      });

    setStateCity("");
  };

 


  const getDate = () => {
    let now = new Date();

    const days = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ];
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let daysWeek = days[now.getDay()];
    let dayOfMonth = now.getDate();
    let monthOfYear = months[now.getMonth()];
    let year = now.getFullYear();
    return `${daysWeek}, ${dayOfMonth} de ${monthOfYear} ${year}`;
  };

  const getTime = () => {
    let timeNow = new Date();
    let hour = timeNow.getHours();
    let minute = timeNow.getMinutes();

    hour = hour % 24;
    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minute < 10) {
      minute = "0" + minute;
    }
    return setStateTime(`${hour}:${minute}`);
  };

  setInterval(() => {
    getTime();
  }, 1000);

  useOnKeyPress(callApi, "Enter");
  return (
    <div className="dashboardApp">

      {/* Parte da esquerda da tela */}

      <div className="dashboardAppLeft">

        {/* Card das informações gerais */}

        <div className="dashboardAll">

          {/* Header do card das informações gerais */}

          <div className="dashboardSearchBar">
            <button className="btnHome">
              <img src={TypeWeatherLogo} />
            </button>
            <input
              className="inputText"
              type="text"
              placeholder="Buscar Local"
              value={stateCity}
              onChange={(event) => {
                setStateCity(event.target.value);
                setCity(event.target.value);
                setCity("");
                setStateTemperatura("")
                setStateWeather("")
                setStateTempMax("")
                setStateTempMin("")

                setStateFeelsLike("")
                setStateChanceOfRain("")
                setStateHumidity("")
                setStateWindKm("")
                setStateUvIndex("")
              }}
            />
          </div>

          {/* Container de resposta da api */}

          <div className="responseContainer">

            {/* Header do container de resposta da api */}

            <div className="responseHeader">
              <p className="responseTitle">
                {city && country != null ? `${city}, ${country}` : " "}
                <br />
                <a className="responseText">{getDate()}</a>
              </p>
              <div className="responseHour">
                <p className="responseTitle">{stateTime}</p>
              </div>
            </div>

            {/* Footer do container de resposta da api */}

            <div className="responseFooter">
              <div className="responseFooterLeft">
                <p className="responseFooterTitle">
                  {Number.isNaN(parseInt(stateTemperatura))
                    ? " "
                    : `${parseInt(stateTemperatura)}°c`}
                </p>
                <p className="responseFooterSubtitle">
                  {Number.isNaN(parseInt(stateTempMax)) &&
                  Number.isNaN(parseInt(stateTempMin))
                    ? " "
                    : `${parseInt(stateTempMax)}°c / ${parseInt(
                        stateTempMin
                      )}°c`}

                  {Number.isNaN(parseInt(stateTemperatura)) ? " "
                    : <img className="responseTextDivider" src={Divider} />}
                  <a className="responseTextWeather">
                    {city && stateWeather != null ? ` ${stateWeather}` : " "}{" "}
                  </a>
                </p>
              </div>

              <div className="responseFooterRight">
                <img src={MoonLogo} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parte da direita da tela */}

      <div className="dashboardAppRight">

        {/* Container de detalhes da resposta da api */}

        <div className="cardDetails">
          <p className="cardDetailsTitle">Detalhes do clima hoje</p>

          {/* Sensação Térmica */}

          <div className="infoDetails">
            <div className="infoDetailsInLeft">
              <div className="imgDetail">
                <img src={Termometer}/>
              </div>
              
              <p className="textLeft">Sensação Térmica</p>
            </div>

            <div className="infoDetailsInRight">
              <p className="textRight">
              {Number.isNaN(parseInt(stateFeelsLike))
                    ? " - "
                    : `${parseInt(stateFeelsLike)}°c`}
              </p>
            </div>
          </div>

          <hr className="datailDivisor"/>
                  
          {/* Probabilidade de chuva */}

          <div className="infoDetails">
            <div className="infoDetailsInLeft">
              <div className="imgDetail">
                <img src={Rain}/>
              </div>
              
              <p className="textLeft">Probabilidade de chuva</p>
            </div>

            <div className="infoDetailsInRight">
              <p className="textRight">
              {Number.isNaN(parseInt(stateChanceOfRain)) 
                    ? " - "
                    : `${parseInt(stateChanceOfRain)}%`}
              </p>
            </div>
          </div>

          <hr className="datailDivisor"/>

          {/* Velocidade do vento */}
          
          <div className="infoDetails">
            <div className="infoDetailsInLeft">
              <div className="imgDetail">
                <img src={Wind}/>
              </div>
              
              <p className="textLeft">Velocidade do vento</p>
            </div>

            <div className="infoDetailsInRight">
              <p className="textRight">
              {!stateWindKm ? " - "
                    : `${stateWindKm} km/h`}
                </p>
            </div>
          </div>

          <hr className="datailDivisor"/>

          {/* Umidade do ar */}

          <div className="infoDetails">
            <div className="infoDetailsInLeft">
              <div className="imgDetail">
                <img src={Drop}/>
              </div>
              
              <p className="textLeft">Umidade do ar</p>
            </div>

            <div className="infoDetailsInRight">
              <p className="textRight">
              {!stateHumidity
                    ? " - "
                    : `${stateHumidity}%`}
              </p>
            </div>
          </div>

          <hr className="datailDivisor"/>

          {/* Índice UV */}

          <div className="infoDetails">
            <div className="infoDetailsInLeft">
              <div className="imgDetail">
                <img src={Sun}/>
              </div>
              
              <p className="textLeft">Índice UV</p>
            </div>

            <div className="infoDetailsInRight">
              <p className="textRight">{stateUvIndex}</p>
              <p className="textRight">
              {!stateUvIndex ? " - "
              : `${stateUvIndex}`}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;