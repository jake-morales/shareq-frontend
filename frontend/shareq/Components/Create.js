import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import {constants} from '../index'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import { Snackbar, IconButton } from '@material-ui/core';

function encode (input) {
    return input.replace(':', '%3A')
}

function Create (props) {

    const [queue, setQueue] = useState(0)

    const handleQueue = (e) => {
        setQueue(e.target.value)
    }

    const [open, setOpen] = useState(false)

    const values = queryString.parse(props.location.search)
    let message = ''
    if(values.m){
        message = values.m.replace('%20', ' ')
    }

    useEffect(() => {
        if(message){
            setOpen(true)
        }
    }, [])

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Grid container
                justify='flex-start'
                direction='column'
                alignItems='stretch'>
                <Typography variant='h3' align='center'>
                    Create a Queue
                </Typography>
                <Typography variant='subtitle1' align='center' gutterBottom>
                        Type a Queue number
                </Typography>
                
                <Grid container
                    justify='center' 
                    spacing={8}
                    alignItems='center'
                    >
                    <Grid item>
                        <TextField 
                            id='outlined-search'
                            label='Queue #'
                            margin='normal'
                            variant='outlined'
                            onChange={handleQueue}
                            type="number"
                            />
                    </Grid>
                    <Grid item
                        >
                        <a href={`http://accounts.spotify.com/authorize/?client_id=70cd90d291d44815bd60a118b76b89ef&response_type=code&redirect_uri=https%3A%2F%2F${encode(constants.backendIP)}%2Fapi%2Fcallback%2F&scope=user-modify-playback-state%20user-read-private&state=${queue}`}> 
                            <Button variant="contained" color="primary" size="large">
                                <SendIcon /> 
                            </Button>
                        </a>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                ContentProps={{'aria-describedby':'message-id'}}
                message={<p id='message=id'>{message}</p>}
                style={{padding:8}}
                action={[
                    <IconButton
                        key="close"
                        onClick={handleClose}
                        aria-label="Close"
                        color="inherit">
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
        </React.Fragment>
    )
}

export default Create

// Textfield type='number' allows e because of scientific notation