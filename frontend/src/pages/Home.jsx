import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

import Select from "react-select";

function Home(){
    const[busStand,setBusStand]=useState("");
    const[to,setTo]=useState("");
    const navigate=useNavigate();
    const [places, setPlaces]=useState([]);
    const [fromPlaces, setFromPlaces]=useState([]);


     useEffect(()=>{
            const fetchPlaces=async()=>{
                const res=await fetch(
                    `${import.meta.env.VITE_API_URL}/api/buses/places`
                );
                const data=await res.json();
                setPlaces(data);
            };

            const fetchFromPlaces=async()=>{
                const res=await fetch(
                    `${import.meta.env.VITE_API_URL}/api/buses/from`
                );
                const data=await res.json();
                setFromPlaces(data);
            }
            fetchFromPlaces();
            fetchPlaces();
    },[]);

    const handleSearch=(e)=>{
        e.preventDefault();
        if(!busStand || !to){
            alert("Both From and To are required");
            return;
        }

        if(busStand===to){
            alert("From and To cannot br the same");
            return;
        }

        navigate(`/results?busStand=${busStand}&to=${to}`);
    };


    const placeOptions = places.map(place => ({
            value: place,
            label: place
        }));

        const fromOptions = fromPlaces.map(place => ({
            value: place,
            label: place
        }));
    return (
        <div className="container">
            <div className="header-row">
                <div className='header'>
                    <h1>KSRTC Bus Info</h1>
                    <p>Search unreserved bus schedules</p>
                </div>   

                <button
                    className="top-contribute-btn"
                    onClick={()=>navigate("/contribute")}
                >
                    Contribute
                </button>
            </div>

            <div className="search-card">
                <form onSubmit={handleSearch}>
                    <div className="form-row">

                        <div className="form-group">
                            <label>From</label>
                            <Select
                                options={fromOptions}
                                value={fromOptions.find(p => p.value === busStand)}
                                onChange={(selected) => setBusStand(selected.value)}
                                placeholder="Select From"
                                isSearchable
                            />
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <Select
                                options={placeOptions}
                                value={placeOptions.find(p => p.value === to)}
                                onChange={(selected) => setTo(selected.value)}
                                placeholder="Select destination"
                                isSearchable
                            />
                        </div>

                    </div>

                    <div className='button-center'>
                        <button type="submit" className="primary-btn">Find Buses</button>
                    </div>
                </form>
            </div>

            <div className="search-card">

                <h3>Search all buses from a place</h3>
                                <Select
                                    className="place-select"
                                    options={fromOptions}
                                    value={fromOptions.find(p=>p.value===busStand)}
                                    onChange={(selected)=>setBusStand(selected.value)}
                                    placeholder="Select From"
                                    isSearchable
                                />
                    <br /><br />

                    <button
                        className="primary-btn"
                        onClick={() => {
                        if (!busStand) {
                            alert("Select a place");
                            return;
                        }
                        navigate(`/results?busStand=${busStand}`);
                        }}
                    >
                        Find Buses
                    </button>
            </div>
        </div>
    );
}

export default Home;