import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

function Home(){
    const[busStand,setBusStand]=useState("");
    const[to,setTo]=useState("");
    const navigate=useNavigate();
    const [places, setPlaces]=useState([]);


     useEffect(()=>{
            const fetchPlaces=async()=>{
                const res=await fetch(
                    `${import.meta.env.VITE_API_URL}/api/buses/places`
                );
                const data=await res.json();
                setPlaces(data);
            };

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
                            <select value={busStand} onChange={(e) => setBusStand(e.target.value)}>
                            <option value="">Select source</option>
                            {places.map((place) => (
                                <option key={place} value={place}>
                                {place}
                                </option>
                            ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <select value={to} onChange={(e) => setTo(e.target.value)}>
                            <option value="">Select destination</option>
                            {places.map((place) => (
                                <option key={place} value={place}>
                                {place}
                                </option>
                            ))}
                            </select>
                        </div>

                    </div>

                    <div className='button-center'>
                        <button type="submit" className="primary-btn">Find Buses</button>
                    </div>
                </form>
            </div>

            <div className="search-card">
                <h3>Search all buses from a place</h3>

                    <select value={busStand} onChange={(e) => setBusStand(e.target.value)}>
                        <option value="">Select source</option>
                        {places.map((place) => (
                        <option key={place} value={place}>
                            {place}
                        </option>
                        ))}
                    </select>

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