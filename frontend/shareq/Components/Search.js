import React, {useState, useEffect} from 'react';
import {constants} from '../index'

import Autosuggest from 'react-autosuggest'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

const Search = (props) => {

    const [token, setToken] = useState('')

    useEffect(() =>{
        fetch(`https://${constants.backendIP}/api/token/`)
            .then(res => res.json())
            .then(data => setToken(data.token))
            .catch(err => console.log(err))
    }, [])
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const getSuggestionValue = suggestion => suggestion.name;
    const renderSuggestion = (suggestion) => {
        return (
            <Grid item
                >
                <img src={suggestion.album.images[2].url} />
                <p style={{display: 'inline'}}>
                    <strong>
                        {suggestion.name} 
                    </strong>
                       by   {suggestion.artists[0].name}
                </p>
            </Grid>
        )
    }

    const renderSuggestionsContainer = ({containerProps, children, query}) => {
        return (
            <div {...containerProps}>
                <Grid container
                    justify='center'
                    >
                    {children}
                </Grid>
            </div>
        )
    }

    const renderInputComponent = (inputProps) => {
        return(
            <Grid container
                justify='center'>
                <input {...inputProps} />
            </Grid>
        )
    }

    const onSuggestionsFetchRequested = ({value}) => {
        const query = value.replace(' ', '%20')
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {headers: new Headers({'Authorization':`Bearer ${token}`})})
            .then(res => res.json())
            .then(data => setSuggestions(data.tracks.items))
            .catch(err => console.log(err))
    }
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    }

    const onChange = (event, {newValue}) => {
        setValue(newValue)
    }
    
    const onSuggestionSelected = (event, {suggestion}) => {
        props.addSong(suggestion)
    }

    const inputProps ={
        value: value,
        onChange: onChange,
        type: 'search',
        placeholder: 'Search songs ...'
    }
    
    return(
        <React.Fragment>
            <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
            renderSuggestionsContainer={renderSuggestionsContainer} 
            renderInputComponent={renderInputComponent}/>
            <hr/>
        </React.Fragment>
    )
}

export default Search;