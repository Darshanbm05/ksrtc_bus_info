import Bus from "../models/bus.js";


export const getBuses=async(req,res)=>{
    try{
        const{busStand,to}=req.query;
        
        if(!busStand){
            return res.status(400).json({
                message:"busStand and to required"
            });
        }
        let query={busStand};
        if(to){
            query.to=to;
        }

        const buses = await Bus.find(query);

        buses.sort((a, b) => {
        const timeA = a.departureTime.replace(":", "");
        const timeB = b.departureTime.replace(":", "");
        return timeA - timeB;
        });

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
                    toPlaces:{$addToSet:"$to"},
                    busStandPlaces:{$addToSet:"$busStand"}
                }
            }
        ]);
        if(!places.length){
            return res.json([]);
        }

        const uniquePlaces=[
            ...new Set([
                ...places[0].fromPlaces,
                ...places[0].toPlaces,
                ...places[0].busStandPlaces
            ])
        ];

        res.json(uniquePlaces.sort());
    }catch(err){
        res.status(500).json({message:"Error fetching places"});
    }
};

export const getFrom=async(req,res)=>{
    try{
        const fromPlaces=await Bus.distinct("busStand");

        if(!fromPlaces.length){
            return res.json([]);
        }
        res.json(fromPlaces.sort());
    }catch(err){
        res.status(500).json({message:"Error fetching places"});
    }
}

