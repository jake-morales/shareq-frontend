import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom'

import App from './Components/App'
import Home from './Components/Home'
import Create from './Components/Create'
import Join from './Components/Join'

//import AppBar from '@material-ui/core/AppBar'
import 'typeface-roboto'
//import { Typography } from '@material-ui/core';

export const constants = {
  backendIP: 'localhost:8000' // localhost:8000 or 192.168.1.8:8000
} 

const Index = (
    <Router>
      <React.Fragment>
        
        <Switch>
          <Route exact path="/create" component={Create} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/queue/:id" component={App}/>
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    </Router>
)

ReactDOM.render(Index, document.getElementById("root"));

/* 
<AppBar
          position='static'
          color='default'>
          <Typography
            variant='h6' color='inherit' >
            ShareQ
          </Typography>
        </AppBar>
*/