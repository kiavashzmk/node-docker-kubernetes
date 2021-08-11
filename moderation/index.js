const express = require('express');
const cors = require('cors')
const axios = require('axios');
const app = express();

app.use(cors());

app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        const body = {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }
        await axios.post('http://event-bus-srv:4005/events', body);
    }
    res.send({})
});

app.listen(4004, () => {
    console.log('Moderation listening on port 4004...');
})