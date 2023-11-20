import { useState } from "react";
import "./App.css";
import MapDisplay from "./components/MapDisplay";

function App() {
  const [location, setLocation] = useState({
    lat: 22.572645,
    lon: 88.363892,
    zoom: 10,
    name: "Kolkata",
  });
  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");

  const clickHandler = async () => {
    // console.log(inputValue);
    try {
      const response = await fetch("http://localhost:8000/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputValue }),
      });

      const fetchData = await response.json();
      console.log(fetchData.coordinates);
      if (fetchData && fetchData.coordinates) {
        const { coordinates } = fetchData; // Destructure coordinates as an array
        if (coordinates && coordinates.length === 2) {
          const [lat, lon] = coordinates; // Destructure latitude and longitude
          setLocation({
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            name: fetchData.title,
            zoom: fetchData.zoom,
          });
          setDescription(fetchData.description);
          setInputValue("");
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
    }
  };
  console.log(setLocation);
  return (
    <div className="App">
      <div className="description_box">
        <h2>Where You like to go ?</h2>
        <div className="description_content">{description}</div>
        <div className="descriptionInput_box">
          <input
            className="input_box"
            placeholder="Enter Place name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                clickHandler();
              }
            }}
          />
          <img
            onClick={clickHandler}
            src="https://cdn-icons-png.flaticon.com/512/12949/12949283.png"
            alt="submit_button"
            width={30}
          />
        </div>
      </div>
      <div className="mapContainer">
        <MapDisplay location={location} />
      </div>
    </div>
  );
}

export default App;
