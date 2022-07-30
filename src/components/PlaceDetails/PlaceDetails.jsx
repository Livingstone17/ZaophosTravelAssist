import React from 'react'
import {Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip} from '@material-ui/core'
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import { PhoneOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

import useStyles from './styles'

function PlaceDetails({place,selected,refProp}) {
    const classes = useStyles();
    console.log(place);
    if (selected) refProp?.current?.scrollIntoView({behavior:'smooth', block:'start'})
  return (
    // <div>
    //     <h1>{place.name}</h1>
    // </div>
    <Card elevation={6}>
        <CardMedia style={{height:360}}
         image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
         title={place.name}
         />
         <CardContent>
            <Typography gutterBottom variant='h5'>{place.name}</Typography>
            <Rating size='small' value={Number(place.rating)} readOnly />
            <Box display='flex' justifyContent="space-between">
                <Typography variant='subtitle1'>Price</Typography>
                <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
            </Box>
            <Box display='flex' justifyContent="space-between">
                <Typography variant='subtitle1'>Ranking</Typography>
                <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
            </Box>
            {place?.awards?.map((award)=>(
                <Box my={1} display='flex' justifyContent="space-between">
                    <img src={award.images.small} alt={award.display_name} sizes="" srcset="" />
                    <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                </Box>
            ))}
            {place?.cuisine?.map(({name})=> (
                <Chip key={name} size='small' label={name} className={classes.chip}/>
            ))}
            {place?.address && (
                <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                    <LocationOnOutlined /> {place.address}
                </Typography>
            )}
            {place?.phone && (
                <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                    <PhoneOutlined /> {place.phone}
                </Typography>
            )}
            <CardActions>
                <Button size='small' color='primary' onClick={()=> window.open(place.web_url, '_blank')}>See More</Button>
                <Button size='small' color='primary' onClick={()=> window.open(place.website, '_blank')}>Website</Button>
            </CardActions>
         </CardContent>
    </Card>
  )
}

export default PlaceDetails