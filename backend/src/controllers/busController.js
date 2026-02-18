import Bus from "../models/bus.js";

export const getBuses=async(req,res)=>{
    try{
        const{from,to}=req.query;
        
        if(!from){
            return res.status(400).json({
                message:"from and to required"
            });
        }
        let query={from};
        if(to){
            query.to=to;
        }
        const buses=await Bus.find(query).sort({departureTime:1});

        res.json(buses);
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
};
