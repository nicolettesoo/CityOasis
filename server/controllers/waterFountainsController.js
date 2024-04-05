const db = require('../models/waterFountainsModels');
var jwt = require('jsonwebtoken')

const waterFountainsConroller = {}
const SECRET_KEY = process.env.TOKEN_KEY


waterFountainsConroller.getWaterFountains = (req, res, next) => {
    console.log(req.body)
    const latitude = req.body.position[0]
    const longitude = req.body.position[1]
    //if logged in grab username
    let queryString
    console.log(latitude, longitude)
    if(req.cookies.authorization){
        console.log("i am in here")
        const response = jwt.verify(req.cookies.authorization, SECRET_KEY)
        console.log('jwt response is: ',response)
        console.log('jwt username is: ',response.username)
        queryString = "SELECT water_fountains.fountain_id, point, point[0] as x, point[1] as y," +
        `(point(point) <@> point(${longitude},${latitude})) as distance,` + 
        "propname as location, position as description, " +
        "usernotes.usernote_id is not null as hasnote, notes " +
        `FROM water_fountains ` + 
        `LEFT JOIN usernotes on water_fountains.fountain_id = usernotes.fountain_id AND usernotes.username = '${response.username}'` + 
        `order by 5 ASC LIMIT 3;`
    }
    else{
         queryString = "SELECT fountain_id, point, point[0] as x, point[1] as y," +
        `(point(point) <@> point(${longitude},${latitude})) as distance,` + 
        "propname as location, position as description " +
        `FROM water_fountains order by 5 ASC LIMIT 3;`
    }


    db.query(queryString)
    .then(data => {
        res.locals.locations = data.rows
        return next()
    })
}

module.exports = waterFountainsConroller