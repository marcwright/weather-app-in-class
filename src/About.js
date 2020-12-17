import React, { Component } from "react";
import "./styles.css";

class About extends Component {
  state = {
    zipcode: ""
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
    console.log("Your zip code is" + this.state.zipcode);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ weather: json });
        console.log(json);
      });
  };
  convert = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  render() {
    const weather = this.state.weather;
    let message;
    if (!weather) {
      message = "";
    } else {
      message = `${weather.name}: currently ${
        weather.weather[0].description
      } with a high of ${this.convert(
        weather.main.temp_max
      )} degrees and a low of ${this.convert(weather.main.temp_min)} degrees`;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>{message}</p>
          <label>
            Please enter your zip code for the weather:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Get my forecast!" />
        </form>
      </div>
    );
  }
}

export default About;
