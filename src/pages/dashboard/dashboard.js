import "./dashboard.css";
import { useOnKeyPress } from "../../hooks/useOnKeyPress";
import { useState, useEffect } from "react";
import ScrollLock from "react-scrolllock";

import TypeWeatherLogo from "../../assets/dashboardPage/btn-logo.svg";
import Divider from "../../assets/dashboardPage/divider.svg";

import Termometer from "../../assets/dashboardPage/detailIcons/termometer.svg";
import Rain from "../../assets/dashboardPage/detailIcons/rain.svg";
import Wind from "../../assets/dashboardPage/detailIcons/wind.svg";
import Drop from "../../assets/dashboardPage/detailIcons/drop.svg";
import Sun from "../../assets/dashboardPage/detailIcons/sun.svg";

import ClearDay from "../../assets/dashboardPage/weatherBackgrounds/clear-day.png";
import ClearNight from "../../assets/dashboardPage/weatherBackgrounds/clear-night.png";
import CloudyDay from "../../assets/dashboardPage/weatherBackgrounds/cloudy-day.png";
import CloudyNight from "../../assets/dashboardPage/weatherBackgrounds/cloudy-night.png";
import RainDay from "../../assets/dashboardPage/weatherBackgrounds/rain-day.png";
import RainNight from "../../assets/dashboardPage/weatherBackgrounds/rain-night.png";
import StormDay from "../../assets/dashboardPage/weatherBackgrounds/storm-day.png";
import StormNight from "../../assets/dashboardPage/weatherBackgrounds/storm-night.png";
import SnowDay from "../../assets/dashboardPage/weatherBackgrounds/snow-day.png";
import SnowNight from "../../assets/dashboardPage/weatherBackgrounds/snow-night.png";
import FewCloudsDay from "../../assets/dashboardPage/weatherBackgrounds/fewclouds-day.png";
import FewCloudsNight from "../../assets/dashboardPage/weatherBackgrounds/fewclouds-night.png";

import ClearDayIcon from "../../assets/dashboardPage/weatherIcons/clear-day.svg";
import ClearNightIcon from "../../assets/dashboardPage/weatherIcons/clear-night.svg";
import CloudyNightIcon from "../../assets/dashboardPage/weatherIcons/cloudy-night.svg";
import FewCloudsDayIcon from "../../assets/dashboardPage/weatherIcons/fewclouds-day.svg";
import FewCloudsNightIcon from "../../assets/dashboardPage/weatherIcons/fewclouds-night.svg";
import RainDayIcon from "../../assets/dashboardPage/weatherIcons/rain-day.svg";
import RainNightIcon from "../../assets/dashboardPage/weatherIcons/rain-night.svg";
import SnowDayIcon from "../../assets/dashboardPage/weatherIcons/snow-day.svg";
import SnowNightIcon from "../../assets/dashboardPage/weatherIcons/snow-night.svg";
import StormDayIcon from "../../assets/dashboardPage/weatherIcons/storm-day.svg";
import StormNightIcon from "../../assets/dashboardPage/weatherIcons/storm-night.svg";

const key = "b2213bc688da17e335540298fee4f0b7";
const detailKey = "f325bd9a5efd4399858165721242405";

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

const days = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function Dashboard() {
  const [stateTemperatura, setStateTemperatura] = useState();
  const [stateTempMax, setStateTempMax] = useState();
  const [stateTempMin, setStateTempMin] = useState();
  const [stateWeather, setStateWeather] = useState("");

  const [stateCity, setStateCity] = useState("");
  const [stateTime, setStateTime] = useState("");

  const [stateChanceOfRain, setStateChanceOfRain] = useState();
  const [stateFeelsLike, setStateFeelsLike] = useState();
  const [stateHumidity, setStateHumidity] = useState();
  const [stateUvIndex, setStateUvIndex] = useState();
  const [stateWindKm, setStateWindKm] = useState();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const daysToShow = 5;
  const [forecastArray, setForecastArray] = useState([]);

  const [backgroundImage, setBackgroundImage] = useState(ClearDay);
  const [iconsCondition, setIconsCondition] = useState(ClearDayIcon);
  let [weatherCondition, setWeatherCondition] = useState();

  const callApi = () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${stateCity}&appid=${key}&units=metric`;
    const geocoderUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${stateCity}&appid=${key}`;
    const weatherDetailsUrl = `https://api.weatherapi.com/v1/forecast.json?key=${detailKey}&q=${stateCity}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${stateCity}&appid=${key}&units=metric`;
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((dadoTemperatura) => {
        console.log(dadoTemperatura);
        setStateTemperatura(dadoTemperatura.main.temp);
        setStateTempMax(dadoTemperatura.main.temp_max);
        setStateTempMin(dadoTemperatura.main.temp_min);
        setStateWeather(dadoTemperatura.weather[0].main);
        setWeatherCondition(dadoTemperatura.weather[0].description);
        console.log(weatherCondition);
      })
      .catch((error) => console.error("Error fetching weather data:", error));

    fetch(geocoderUrl, {
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      }, 
    })
      .then((response) => response.json())
      .then((dataLocalization) => {
        if (dataLocalization.length > 0) {
          setCountry(dataLocalization[0].country);
          setCity(dataLocalization[0].name);
          console.log(dataLocalization[0])
        }
      })
      .catch((error) => console.error("Error fetching geocode data:", error));

    fetch(weatherDetailsUrl)
      .then((response) => response.json())
      .then((detailInfo) => {
        setStateFeelsLike(detailInfo.current.feelslike_c);
        setStateChanceOfRain(
          detailInfo.forecast.forecastday[0].day.daily_chance_of_rain
        );
        setStateHumidity(detailInfo.current.humidity);
        setStateUvIndex(detailInfo.current.uv);
        setStateWindKm(detailInfo.current.wind_kph);
      })
      .catch((error) =>
        console.error("Error fetching weather details:", error)
      );

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((forecastData) => {
        const tempArray = [];
        for (let i = 7; i < 40; i += 8) {
          tempArray.push({
            main: forecastData.list[i].weather[0].main,
            icon: `https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png`,
            temp_max: forecastData.list[i].main.temp_max,
            temp_min: forecastData.list[i].main.temp_min,
          });
        }
        setForecastArray(tempArray);
      })
      .catch((error) => console.error("Error fetching forecast data:", error));

    setStateCity("");
  };

  const now = new Date();
  const currentDate = `${days[now.getUTCDay()]}, ${now.getUTCDate()} de ${months[now.getUTCMonth()]
    } ${now.getUTCFullYear()}`;

  useEffect(() => {
    const hoursNow = new Date();
    if (weatherCondition === "clear sky" && hoursNow.getHours() <= 12) {
      setBackgroundImage(ClearDay);
      setIconsCondition(ClearDayIcon);
    } else if (weatherCondition === "clear sky" && hoursNow.getHours() >= 13) {
      setBackgroundImage(ClearNight);
      setIconsCondition(ClearNightIcon);
    } else if (weatherCondition === "few clouds" && hoursNow.getHours() <= 12) {
      setBackgroundImage(FewCloudsDay);
      setIconsCondition(FewCloudsDayIcon);
    } else if (weatherCondition === "few clouds" && hoursNow.getHours() >= 13) {
      setBackgroundImage(FewCloudsNight);
      setIconsCondition(FewCloudsNightIcon);
    } else if (weatherCondition === "mist" && hoursNow.getHours() <= 12) {
      setBackgroundImage(CloudyDay);
      setIconsCondition(CloudyNightIcon);
    } else if (weatherCondition === "mist" && hoursNow.getHours() >= 13) {
      setBackgroundImage(CloudyNight);
      setIconsCondition(CloudyNightIcon);
    } else if (weatherCondition === "broken clouds" && hoursNow.getHours() <= 12) {
      setBackgroundImage(CloudyDay);
      setIconsCondition(CloudyNightIcon);
    } else if (weatherCondition === "broken clouds" && hoursNow.getHours() >= 13) {
      setBackgroundImage(CloudyNight);
      setIconsCondition(CloudyNightIcon);
    } else if (weatherCondition === "rain" && hoursNow.getHours() <= 12) {
      setBackgroundImage(RainDay);
      setIconsCondition(RainDayIcon);
    } else if (weatherCondition === "rain" && hoursNow.getHours() >= 13) {
      setBackgroundImage(RainNight);
      setIconsCondition(RainNightIcon);
    } else if (weatherCondition === "shower rain" && hoursNow.getHours() <= 12) {
      setBackgroundImage(RainDay);
      setIconsCondition(RainDayIcon);
    } else if (weatherCondition === "shower rain" && hoursNow.getHours() >= 13) {
      setBackgroundImage(RainNight);
      setIconsCondition(RainNightIcon);
    } else if (weatherCondition === "thunderstorm" && hoursNow.getHours() <= 12) {
      setBackgroundImage(StormDay);
      setIconsCondition(StormDayIcon);
    } else if (weatherCondition === "thunderstorm" && hoursNow.getHours() >= 13) {
      setBackgroundImage(StormNight);
      setIconsCondition(StormNightIcon);
    } else if (weatherCondition === "snow" && hoursNow.getHours() <= 12) {
      setBackgroundImage(SnowDay);
      setIconsCondition(SnowDayIcon);
    } else if (weatherCondition === "snow" && hoursNow.getHours() >= 13) {
      setBackgroundImage(SnowNight);
      setIconsCondition(SnowNightIcon);
    }
  }, [weatherCondition]);

  const getWeatherForNextDays = (daysToShow) => {
    const todayIndex = now.getUTCDay() + 1;
    const nextDays = [];

    for (let i = 0; i < daysToShow; i++) {
      const nextDayIndex = (todayIndex + i) % 7;
      nextDays.push(days[nextDayIndex]);
    }

    return nextDays;
  };

  const displayedWeather = getWeatherForNextDays(daysToShow);

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

  useEffect(() => {
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useOnKeyPress(callApi, "Enter");

  return (
    <ScrollLock>
      <div className="dashboardApp">
        {/* Parte da esquerda da tela */}
        <div className="dashboardAppLeft">
          {/* Card das informações gerais */}
          <div className="dashboardAll">
            {/* Header do card das informações gerais */}
            <div className="dashboardSearchBar">
              <button className="btnHome">
                <img src={TypeWeatherLogo} alt="Weather Logo" />
              </button>
              <input
                className="inputText"
                type="text"
                placeholder="Buscar Local"
                value={stateCity}
                onChange={(event) => {
                  setStateCity(event.target.value);
                }}
              />
            </div>

            {/* Container de resposta da api */}
            <div
              className="responseContainer"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {/* Header do container de resposta da api */}
              <div className="responseHeader">
                <p className="responseTitle">
                  {city && country ? `${city}, ${country}` : " "}
                  <br />
                  <span className="responseText">{currentDate}</span>
                </p>
                <div className="responseHour">
                  <p className="responseTitle">{stateTime}</p>
                </div>
              </div>

              {/* Footer do container de resposta da api */}
              <div className="responseFooter">
                <div className="responseFooterLeft">
                  <p className="responseFooterTitle">
                    {!Number.isNaN(parseInt(stateTemperatura))
                      ? `${parseInt(stateTemperatura)}°c`
                      : " "}
                  </p>
                  <p className="responseFooterSubtitle">
                    {!Number.isNaN(parseInt(stateTempMax)) &&
                      !Number.isNaN(parseInt(stateTempMin))
                      ? `${parseInt(stateTempMax)}°c / ${parseInt(
                        stateTempMin
                      )}°c`
                      : " "}
                    {!Number.isNaN(parseInt(stateTemperatura)) ? (
                      <img
                        className="responseTextDivider"
                        src={Divider}
                        alt="Divider"
                      />
                    ) : (
                      " "
                    )}
                    <span className="responseTextWeather">
                      {city && stateWeather ? ` ${stateWeather}` : " "}
                    </span>
                  </p>
                </div>
                <div className="responseFooterRight">
                  <div className="responseFooterImage">
                    {iconsCondition !== undefined ? (
                      <img src={iconsCondition} alt="Weather Logo" />
                    ) : (
                      <img
                        src="https://placehold.co/200"
                        className="imagePlaceholder"
                        alt="Weather Logo"
                      />
                    )}
                  </div>
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
                  <img src={Termometer} alt="Termometer" />
                </div>
                <p className="textLeft">Sensação Térmica</p>
              </div>
              <div className="infoDetailsInRight">
                <p className="textRight">
                  {!Number.isNaN(parseInt(stateFeelsLike))
                    ? `${parseInt(stateFeelsLike)}°c`
                    : " - "}
                </p>
              </div>
            </div>

            <hr className="datailDivisor" />

            {/* Probabilidade de chuva */}
            <div className="infoDetails">
              <div className="infoDetailsInLeft">
                <div className="imgDetail">
                  <img src={Rain} alt="Rain" />
                </div>
                <p className="textLeft">Probabilidade de chuva</p>
              </div>
              <div className="infoDetailsInRight">
                <p className="textRight">
                  {stateChanceOfRain !== undefined
                    ? `${parseInt(stateChanceOfRain)}%`
                    : " - "}
                </p>
              </div>
            </div>

            <hr className="datailDivisor" />

            {/* Velocidade do vento */}
            <div className="infoDetails">
              <div className="infoDetailsInLeft">
                <div className="imgDetail">
                  <img src={Wind} alt="Wind" />
                </div>
                <p className="textLeft">Velocidade do vento</p>
              </div>
              <div className="infoDetailsInRight">
                <p className="textRight">
                  {stateWindKm !== undefined ? `${stateWindKm} km/h` : " - "}
                </p>
              </div>
            </div>

            <hr className="datailDivisor" />

            {/* Umidade do ar */}
            <div className="infoDetails">
              <div className="infoDetailsInLeft">
                <div className="imgDetail">
                  <img src={Drop} alt="Drop" />
                </div>
                <p className="textLeft">Umidade do ar</p>
              </div>
              <div className="infoDetailsInRight">
                <p className="textRight">
                  {!Number.isNaN(parseInt(stateHumidity))
                    ? `${stateHumidity}%`
                    : " - "}
                </p>
              </div>
            </div>

            <hr className="datailDivisor" />

            {/* Índice UV */}
            <div className="infoDetails">
              <div className="infoDetailsInLeft">
                <div className="imgDetail">
                  <img src={Sun} alt="Sun" />
                </div>
                <p className="textLeft">Índice UV</p>
              </div>
              <div className="infoDetailsInRight">
                <p className="textRight">
                  {!Number.isNaN(parseInt(stateUvIndex))
                    ? `${stateUvIndex}`
                    : " - "}
                </p>
              </div>
            </div>
          </div>

          {/* Container de previsão do tempo */}
          <div className="forecastContainer">
            <div className="forecastContainerTitle">
              <p>Previsão para {daysToShow} dias</p>
            </div>
            <div className="forecastContainerCards">
              {displayedWeather.map((day, index) => (
                <div key={index} className="forecastContainerDays">
                  <p className="forecastContainerDaysTitle">{day}</p>
                  <div className="forecastContainerImage">
                    {forecastArray[index] ? (
                      <img src={forecastArray[index].icon} alt="Weather Icon" />
                    ) : (
                      <img
                        src="https://placehold.co/56x56"
                        className="imagePlaceholder"
                        alt="Weather Icon"
                      />
                    )}
                  </div>
                  <p className="forecastContainerDaysTitle">
                    {forecastArray[index] && forecastArray[index].main
                      ? forecastArray[index].main
                      : " - "}
                  </p>
                  <p className="forecastContainerDaysText">
                    {forecastArray[index] &&
                      forecastArray[index].temp_max !== undefined
                      ? `${parseInt(forecastArray[index].temp_max)}°c`
                      : " - "}
                    <span className="forecastContainerDaysTextColored">
                      {forecastArray[index] &&
                        forecastArray[index].temp_min !== undefined
                        ? ` ${parseInt(forecastArray[index].temp_min)}°c`
                        : " - "}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollLock>
  );
}

export default Dashboard;
