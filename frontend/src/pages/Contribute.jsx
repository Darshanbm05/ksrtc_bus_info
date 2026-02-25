import{ useState } from "react";
import { Link } from "react-router-dom";

function Contribute(){
    const [formData, setFormData]=useState({
        from:"",
        to:"",
        departureTime:"",
        busType:"",
        message:""
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();

       try{
        const response=await fetch(
            `${import.meta.env.VITE_API_URL}/api/contributions`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            }
        );

        if(!response.ok){
            throw new Error("Failed");
        }
        if(response.ok){
            alert("Contribution submitted successfully");
            setFormData({
                from:"",
                to:"",
                departureTime:"",
                busType:"",
                message:""
            });
        }

        
       }catch(err){
            alert(err,"error submitting request");
       }
    };

    return(
        <div className="contributer-container">
            <Link to="/">Back to Home</Link>
            <div className="contribute-card">
                <h2>Contribute</h2>

        
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>From</label>
                            <input type="text" 
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <input type="text"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label>Departure Time(24-hour format)</label>
                            <input type="text" 
                            name="departureTime"
                            value={formData.departureTime}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label>Bus Type</label>
                            <input
                            type="text" 
                            name="busType"
                            value={formData.busType}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Additional Details</label>
                                <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                />
                            
                        </div>

                        <br />

                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
            </div>
                <div className="contact-section">
                    <h4>Conatact Us</h4>
                    <div className="contact-box">
                        <p>Email: your-eamil@example.com</p>
                        <p>Phone:+91-xxxxxxxxxx</p>
                    </div>
                </div>


        </div>
    )
}

export default Contribute;