const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();


const app = express();

app.use(morgan('dev'));

let movieData = [

]

app.get('/', (req, res) => {

    
    for(let index = 0; index < movieData.length; index++){

        let {i,t} = req.query;
        let search = i || t;
        let searchBy = Object.keys(req.query)[0] == 'i' ? 'imdbID' : 'Title';
        if (movieData[index][searchBy] == search){  
            res.send(movieData[index]);
            console.log('data sent from cache')
            return;
        }

    }
        axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
        .then((response) => {
            
            let data = response.data
            movieData.push(data)
                console.log('data sent from API call')
            res.send(data)
        })

        .catch(error => {
        })

    })

app.get('*', (req, res) => {
    res.send('Not Found')
});
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;