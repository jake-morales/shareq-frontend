import React, {useState} from 'react'
import {constants} from '../index'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function Join (props) {
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleJoin = () => {
        fetch(`http://${constants.backendIP}/api/exists/${input}/` )
            .then(response =>{
                console.log(response.status)
                if (response.status === 200){
                    props.history.push(`/queue/${input}`)
                }
                else{
                    setOpen(true)
                }
            })
           .catch(err => console.log(err))
    }


    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Grid container
                justify='center'
                direction='column'>
                <Typography variant='h3' align='center'>
                    Join a Queue
                </Typography>
                <Typography variant='subtitle1' align='center' gutterBottom>
                        Enter the Queue number
                </Typography>
                <Grid container
                    alignItems='center'
                    justify='center'
                    spacing={8}>
                    <Grid item>
                        <TextField 
                            id='outlined-search'
                            label='Queue #'
                            type='number'
                            margin='normal'
                            variant='outlined'
                            onChange={handleInput}
                            />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="large" onClick={handleJoin}>
                            <SendIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar 
                anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                ContentProps={{'aria-describedby':'message-id'}}
                message={<span id='message=id'>Queue does not exist</span>}
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
    );
}

export default Join