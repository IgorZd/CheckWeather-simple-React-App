import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
const APIKeys = "b9714a1bbe61340e5f153867fd0cd2a7";
class App extends React.Component {
  state = {
    temp: 0,
    city: "",
    country: "",
    sunrise: 0,
    pressure: 0,
    error: ""
  }
  getWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    if (city) {
      const APIUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKeys}&units=metric`);
      const data = await APIUrl.json();
      let sunrise = data.sys.sunrise,
          date = new Date();
      date.setTime(sunrise);
      let sunriseDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
       temp: data.main.temp,
       city: data.name,
       country: data.sys.country,
       sunrise: sunriseDate,
       pressure: data.main.pressure,
       error: ""
     });
    } else {
      this.setState({
        temp: 0,
        city: "",
        country: "",
        sunrise: 0,
        pressure: 0,
        error: "Введите название города!"
     });
    }
  }
  render(){
    return(
      <div className="wrapper">
       <div className = "title">
         <Info />
       </div>
       <div className="weather_info">
       <Form weatherMethod = {this.getWeather} />
       <Weather 
       temp = {this.state.temp}
       city = {this.state.city}
       country = {this.state.country}
       sunrise = {this.state.sunrise}
       pressure = {this.state.pressure}
       error = {this.state.error}/>
       </div>
      </div>
    );
  }
}
export default App;