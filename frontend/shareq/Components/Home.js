import React from 'react'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


function Home () {
    
    return (
        <Grid container
            justify="center">
            <Grid container
                direction="column">
                <Typography variant='h3' align='center'>
                    Welcome to ShareQ
                </Typography>
                <Typography variant='subtitle1' align='center' gutterBottom>
                    Make a Spotify queue. Vote with friends. Enjoy hassle-free group listening!
                </Typography>
            </Grid>
            <Grid container
                direction="row"
                spacing={16}
                justify="center"
                >
                <Grid item>
                    <Link to="/create">
                        <Button variant='contained' 
                                color="primary"
                                size="large">
                            Create
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/join">
                        <Button variant='contained'
                                color="secondary"
                                size="large">
                            Join
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home