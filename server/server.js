const express = require("express");
const app = express();
const path = require('path');
const webpack = require('../webpack.config')
const getWaterFountainsRouter = require('./routes/getWaterFountains.js')

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../client')));


if (webpack.mode == "production") {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }) 
}


app.use('/getWaterFountains', getWaterFountainsRouter)



app.listen(3000, () => {console.log('listening on port 3000')})