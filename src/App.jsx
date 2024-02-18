/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Form, Select, Image } from "antd";

import solForte from "./images/SolForte.png";
import chuvaForte from "./images/ChuvaForte.png";
import noite from "./images/Noite.png";
import solNublado from "./images/SolNublado.png";
import noiteNublada from "./images/NoiteNublada.png";

import mockData from "./MockData/mockData.json"

function App() {

  const [options, setOptionsData] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [infoCity, setInfoCity] = useState();
  const [imgTemperature, setImgTemparaturee] = useState();

  useEffect(() => {
    const divTemperature = document.getElementById("temperature");
    const divContentTemperatue = document.getElementById("content1");

    const cities = () => {
      const listCities = mockData;
      const newOptions = listCities?.data?.map((city) => ({
        value: city?.id,
        label: city?.request?.query,
      }));

      const dataCity = listCities?.data?.map((city) => ({
        id: city.id,
        name: city?.request?.query,
        is_day: city.current.is_day,
        visibility: city.current.visibility,
        cloudcover: city.current.cloudcover,
        pressure: city.current.pressure,
        temperature: city.current.temperature,
        weather_code: city.current.weather_code,
        timezone_id: city.location.timezone_id,
        humidity: city.current.visibility,
        wind_speed: city.current.wind_speed,
      }));
      setOptionsData(prevOptions => [...prevOptions, ...newOptions]);
      setDataCities(prevOptions => [...prevOptions, ...dataCity]);
    };
  
    cities();

    const handleResize = () => {
      if (divTemperature.clientWidth < 243) {
        divContentTemperatue.style.flexDirection = "column";
      } else {
        divContentTemperatue.style.flexDirection = "row";
      }
    };

    // Adiciona o ouvinte de evento quando o componente é montado
    window.addEventListener("resize", handleResize);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);


  const setImageTemparature = () => {
    if(infoCity){
      switch(infoCity.weather_code){
        case 116:
        case 200:
          setImgTemparaturee(solNublado);
          break;
        case 113: 
          setImgTemparaturee(infoCity.is_day ? solForte : noite);
          break;
        default:
          setImgTemparaturee(null);
          break;
      }
    }
  }

  const selectCity = (idCity) => {
    const dataCity = dataCities.find((city) => city.id === idCity)
    setInfoCity(dataCity);
    setImageTemparature()
  }

  return (
    <div className="App">
      <div className="box-container">
        <div className="search-container">
          <Form
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item name="url" rules={[{ required: true }]}>
              <Select options={options}  onSelect={(option) => selectCity(option)}  placeholder="Informe a Região" />
            </Form.Item>
          </Form>
        </div>
        <div className="content">
          <div className="content1" id="content1">
            <div className="img-climate">
              {infoCity 
                ? 
                  <Image
                    preview={false}
                    alt="img_climate"
                    src={imgTemperature} /> 
                : 
                  ""
              }
              
            </div>
            <div className="temperature" id="temperature">
              <h1>{infoCity?.temperature}°C</h1>
            </div>
          </div>

          <div className="content2">
            <div className="city">
              <h2>{infoCity?.name}</h2>
            </div>
            <div className="informations">
              <div className="informationsDetails">
                <div className="Details">
                  <span id="contentRain">Visibilidade: </span> <span> {infoCity?.visibility} % </span>
                </div>

                <div className="Details">
                  <span id="contentUmidade">Umidade: </span> <span> {infoCity?.humidity} % </span>
                </div>

                <div className="Details">
                  <span id="contentVento">Vento: </span> <span> {infoCity?.wind_speed} Km/h </span>
                </div>
              </div>

              <div className="localInformation">
                Clima <br />
                sexta-feira, 22:00 <br />
                Nublado <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
