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

export const getPlaces=async(req,res)=>{
    try{
        const places=await Bus.aggregate([
            {
                $group:{
                    _id:null,
                    fromPlaces:{$addToSet:"$from"},
                    toPlaces:{$addToSet:"$to"}
                }
            }
        ]);
        if(!places.length){
            return res.json([]);
        }

        const uniquePlaces=[
            ...new Set([
                ...places[0].fromPlaces,
                ...places[0].toPlaces
            ])
        ];

        res.json(uniquePlaces.sort());
    }catch(err){
        res.status(500).json({message:"Error fetching places"});
    }
};
