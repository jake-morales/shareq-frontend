import {useState, useEffect} from 'react'



export default function useQueueWS(queue, ws){
    const [songs, setSongs] = useState([])    

    const ws = new WebSocket(`ws://localhost:8000/api/queue/${queue}`)
    useEffect(()=>{
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
            switch(data.command){
              case 'fetch':
                setSongs(data.songs)
                break;
              case 'new_song':
                console.log("adding new song")
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
                console.log("default")
                break;
            }
        }
      
        ws.onopen = () => {
            ws.send(JSON.stringify({command: 'fetchSongs', payload:queue}))
        }
        return () => ws.close()
    }, [])

    const addSong = (item) => {
        console.log("got here")
        ws.send(JSON.stringify({command:'new_song', payload:{queue:queue, name:item.name, uri:item.uri}}))
    }

    return [songs, addSong]
}