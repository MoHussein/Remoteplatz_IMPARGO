const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const exampleData = require('../data/tracking.json')

app.get('/', (req, res) => {
  // TODO(Task 1): Split tracking data into trip segments for example by using the time property.
    var trips = [];
    var trip = [];
    for (var i = 1; i < exampleData.length; i++) {
        trip.push(exampleData[i-1]);
        var start_time = new moment(exampleData[i-1].time);
        if(start_time.diff(exampleData[i].time, 'day') > 1){
            trips.push(trip);
            trip = [];
        }
        if(i+1 == exampleData.length){
            if(trip.length == 0){
                trips.push(exampleData[i]);
            }else{
                trip.push(exampleData[i]);
                trips.push(trip);
            }
        }
    }
    res.send(trips);
})


app.get('/location/:when', (req, res) => {
  // TODO(Task 2): Return the tracking data closest to `req.params.when` from `exampleData`.
  res.send({})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
