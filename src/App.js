import React, {useEffect, useState} from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
// import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import {CssBaseline, Grid} from '@material-ui/core'
import { getPlacesData } from './api/api'
import ErrorBoundary from './components/ErrorBoundary'

function App() {

    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({})

    const [filteredPlaces,setFilteredPlaces] = useState([]);
    const [bounds, setBounds] = useState([]);

    const [childClicked, setchildClicked] = useState(null)
    const [isLoading,setIsLoading] = useState(false);

    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');



    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude, lng:longitude});
        })
    },[])

    useEffect(()=>{
        const filteredPlaces = places.filter((place)=>place.rating>rating
        )
        setFilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getPlacesData(type,bounds.sw, bounds.ne)
            .then((data)=>{
            setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
            })
        }
    },[type,bounds]);

  return (
    <>
    {/* <ErrorBoundary> */}
        <CssBaseline />
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width:'100%'}}>
            <ErrorBoundary>
            <Grid item xs={12} md={4}>
                <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} 
                isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating} />
            </Grid>
            </ErrorBoundary>
            <ErrorBoundary>
            <Grid item xs={12} md={8}>
                <Map 
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places} 
                setChildClicked={setchildClicked}
                    />
            </Grid>
            </ErrorBoundary>
        </Grid>
        {/* <List />
        <Map/>
        <PlaceDetails /> */}
    {/* </ErrorBoundary> */}
    </>
  )
}

export default App