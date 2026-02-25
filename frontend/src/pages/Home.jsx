import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

function Home(){
    const[from,setFrom]=useState("");
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
        if(!from || !to){
            alert("Both From and To are required");
            return;
        }

        if(from===to){
            alert("From and To cannot br the same");
            return;
        }

        navigate(`/results?from=${from}&to=${to}`);
    };

    return (
        <div className="container">
            <div className="header">
            <h1>KSRTC Bus Info</h1>
            <p>Search unreserved bus schedules</p>
            </div>

            <div className="search-card">
            <form onSubmit={handleSearch}>
                <div className="form-row">

                <div className="form-group">
                    <label>From</label>
                    <select value={from} onChange={(e) => setFrom(e.target.value)}>
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

                <button type="submit" className="primary-btn">Search Route</button>
            </form>
            </div>

            <div className="search-card" style={{ marginTop: "20px" }}>
            <h3>Search all buses from a place</h3>

            <select value={from} onChange={(e) => setFrom(e.target.value)}>
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
                if (!from) {
                    alert("Select a place");
                    return;
                }
                navigate(`/results?from=${from}`);
                }}
            >
                Search From This Place
            </button>
            </div>
            <div className="contribute-container">
                <button
                    className="contribute-btn"
                    onClick={()=>navigate("/contribute")}
                >
                    Contribute
                </button>
            </div>
        </div>
    );
}

export default Home;