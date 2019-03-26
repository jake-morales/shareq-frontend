import React, { useEffect, useState } from 'react'
import Search from './Search'
import {constants} from '../index'

import Song from './Song'
//import Websocket from 'react-websocket'
//import useQueueWS from '../Hooks/useQueueWS'
//import Queue from './Queue'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {IconButton, Avatar, Fab} from '@material-ui/core/'
import SkipNextIcon from '@material-ui/icons/SkipNext'

const ws = new WebSocket(`wss://shareq.herokuapp.com/ws/queue/`)

function App (props) {

  const [songs, setSongs] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [cookieExists, setCookieExists] = useState(false)

  ws.onmessage = (e) => {
    const result = JSON.parse(e.data)
    switch(result.command){
      case 'fetch':
        setSongs(result.songs)
        setLoading(false)
        break;
      case 'new_song':
        setSongs([...songs, result.payload])
        break;
      case 'update':
        const ind = songs.findIndex(obj => obj.id === result.payload.songID)
        const newSongs = [...songs]
        newSongs[ind].votes = result.payload.votes
        setSongs(newSongs)
        break;
      case 'delete_song':
        
      default:
        break;
      }
  }

  useEffect(()=>{

    fetch(`http://localhost:8000/api/exists/${props.match.params.id}/` )
            .then(response =>{
                console.log(response.status)
                if (response.status !== 200){
                    props.history.push(`/join/`)
                }
            })
           .catch(err => console.log(err))

    if (ws.readyState === WebSocket.CONNECTING){
      ws.onopen = () => {
        ws.send(JSON.stringify({command: 'join_room', payload: props.match.params.id}))
        ws.send(JSON.stringify({command: 'fetchSongs', payload:props.match.params.id}))
      }
    }
    else if(ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify({command: 'join_room', payload: props.match.params.id}))
      ws.send(JSON.stringify({command: 'fetchSongs', payload:props.match.params.id}))
    }
    else{
      console.log("websocket error")
    }    
  }, [])

  useEffect(()=>{
    fetch(`http://localhost:8000/api/admin/${props.match.params.id}/`,{credentials: 'include'})
      .then(res=>res.text())
      .then( (data) => {
        console.log(data)
        if(data == 'admin'){
          setCookieExists(true)
        }
      })
      .catch(err=>console.log(err))
  }, [])

  const addSong = (item) => {
    ws.send(JSON.stringify({command:'new_song', payload:{queue:props.match.params.id, name:item.name, uri:item.uri, artist:item.artists[0].name, image:item.album.images[2].url}}))
  }

  const upvote = param => e => {
    ws.send(JSON.stringify({command: 'upvote', payload:param}))
  }

  const downvote = param => e => {
    ws.send(JSON.stringify({command: 'downvote', payload:param}))
  }

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  const playNext = () => {
    fetch(`http://localhost:8000/api/next/${props.match.params.id}`, {credentials:'include'})
      .then(res=>res.text())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
  }

  return (
    <div>
      {cookieExists && (<Fab color='primary' size='large' style={fabStyle} onClick={playNext} >
        <SkipNextIcon/>
      </Fab>)}
      {isLoading ? (
        <Typography variant='h3' align='center'>
                  Loading ...
        </Typography> ) : (
        <React.Fragment>
            <Search addSong={addSong}/>
            <Grid container
              justify='center'>
              {songs.length === 0 ? (
                <Typography variant='h3' align='center'>
                  Queue is empty ...
                </Typography>
              ) : (
                <Grid container
                  direction='column'
                  alignItems='center'
                  justify='flex-start'
                  style={{width: '100%'}}>
                {songs.sort((a, b) => b.votes - a.votes)
                  .map(song=>(
                    <Song key={song.id} song={song} upvote={upvote} downvote={downvote}/>
                ))}
              </Grid>
              )}
            </Grid>
        </React.Fragment>
    )}
  </div>
  )
}

export default App;

/*
const ws = new WebSocket(`ws://localhost:8000/ws/queue/${props.match.params.id}/`)

  useEffect(()=>{
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data)
      switch(data.command){
        case 'fetch':
          setSongs(data.songs)
          console.log(songs)
          break;
        case 'new_song':
          setSongs([
            ...songs,
            {
              id: data.payload.id,
              name: data.payload.name,
              votes: 0
            }
          ])
          break;
        default:
          break;
        }
    }
    
    while(ws.readyState === 0){

    }
    ws.send(JSON.stringify({command: 'fetchSongs', payload:props.match.params.id}))

    return () => ws.close()
  }, [])
*/