import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Results() {
  const location = useLocation();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const busStand = params.get("busStand");
  const to = params.get("to");


  const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${minutes}`;
  };
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/api/buses?busStand=${busStand}`;

        if (to) {
          url += `&to=${to}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBuses(data);
      } catch (err) {
        setError(err,"Error loading buses");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [busStand, to]);


  return (
    <div className="container">

      <Link to="/" style={{ textDecoration: "none", fontWeight: "600" }}>
        ← Back to Home
      </Link>

      <h2 style={{ marginTop: "20px" }}>
        {to
          ? `Results for ${busStand} `
          : `All buses from ${busStand}`}
      </h2>

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && buses.length === 0 && (
        <p>No buses found for this route.</p>
      )}

    {!loading &&
        buses.map((bus) => (
            <div key={bus.serviceNo} className="results-card">

            <div>
                <div className="departure-time">
                {formatTime(bus.departureTime)}
                </div>

                <div>
                {bus.from} → {bus.to}
                </div>

                <div style={{ fontSize: "13px", color: "#555" }}>
                Class: {bus.busType}
                </div>

                {bus.via && bus.via.length > 0 && (
                <div style={{ fontSize: "13px", color: "#555" }}>
                    Via: {bus.via.join(", ")}
                </div>
                )}
            </div>

            </div>
    ))}
    </div>
  );
}

export default Results;