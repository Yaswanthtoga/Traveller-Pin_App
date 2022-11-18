import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Mark from "@mui/icons-material/Room";
import Star from "@mui/icons-material/Star";
import "./App.css";
import axios from "axios";
import * as timeago from "timeago.js";


const App = () => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [data,setData] = useState([]);

  useEffect(()=>{
        const getPins = async ()=>{
          try{
            const res = await axios.get("/pin");
            setData(res.data);
            console.log(setData);
          }catch(err){
            console.log(err);
          }
        }
      
        getPins();
      },[])

  return (
    <Map
      initialViewState={{
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    >
      {data &&
        data.map((p, index) => {
          return (
            <div>
              <Marker
                key={`marker-${index}`}
                longitude={p.lon}
                latitude={p.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedPin(p);
                }}
              >
                <Mark style={{ fontSize: "40px", color: "slateblue" ,cursor:"pointer"}} />
              </Marker>
              {selectedPin && (
                <Popup
                  latitude={selectedPin.lat}
                  longitude={selectedPin.lon}
                  anchor="top"
                  onClose={() => setSelectedPin(null)}
                  closeButton={true}
                  offsetLeft={10}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{selectedPin.title}</h4>
                    <label>Review</label>
                    <p className="review">{selectedPin.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(selectedPin.rating).fill(
                        <Star className="star" />
                      )}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Informed by <b>{selectedPin.username}</b>
                    </span>
                    <span className="date">{timeago.format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
    </Map>
  );
};

export default App;