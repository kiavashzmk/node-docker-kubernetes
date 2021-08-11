const express = require('express');
const cors = require('cors')
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const events = []

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    console.log(event)
    axios.post('http://post-clusterip-srv:4001/events', event);
    axios.post('http://comment-srv:4002/events', event)
    axios.post('http://query-srv:4003/events', event)
    axios.post('http://moderation-srv:4004/events', event)
    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('EventBus listening on port 4005...');
})