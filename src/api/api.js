import axios from "axios";



export const getPlacesData = async(type,sw, ne) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    try{
        const { data: { data } } = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat
            },
            headers: {
              'X-RapidAPI-Key': '24c86839a6mshe30f7bfa888edd9p12dbc4jsnf53e96ffeb88',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }});
        return data;
    }catch(error){
        console.log(error);
    }
};

