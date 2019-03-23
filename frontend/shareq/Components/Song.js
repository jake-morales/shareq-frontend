import React from 'react'

import {Grid, Typography, IconButton, Avatar} from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const Song = (props) => {
    
    
    return(
        <Grid container item alignItems='center' spacing={16}>
            <Grid container item wrap='nowrap' xs={10} spacing={8} alignItems='center'> 
            <Grid item >
                <Avatar src={props.song.image}/>
            </Grid>
            <Grid item xs zeroMinWidth>
                <Typography noWrap variant='h6'>{props.song.name}</Typography>
                <Typography variant='subheading'>{props.song.artist}</Typography>
            </Grid>
            </Grid>
            <Grid container item xs={2} direction='column' spacing={0}>
            <IconButton onClick={props.upvote(props.song.id)}>
                <ArrowUpwardIcon />
            </IconButton>
            <Typography inline align='center' variant='h6'>{props.song.votes}</Typography>
            <IconButton onClick={props.downvote(props.song.id)}>
                <ArrowDownwardIcon />
            </IconButton>
            </Grid>
        </Grid>
    )
}

export default Song;
