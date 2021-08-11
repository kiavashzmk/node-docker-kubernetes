const express = require('express');
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios');
const app = express();

app.use(cors());

// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

const commentsByPostId = {};
app.route('/posts/:id/comments')
    .get((req, res) => {
        console.log(commentsByPostId)
        res.send(commentsByPostId[req.params.id] || [])
    })
    .post(async (req, res) => {
        const commentId = randomBytes(4).toString('hex');
        const { content } = req.body;
        const comments = commentsByPostId[req.params.id] || [];
        comments.push({ id: commentId, content, status: 'pending' })
        commentsByPostId[req.params.id] = comments;
        const data = {
            type: 'CommentCreated',
            data: {
                id: commentId, content, postId: req.params.id, status: 'pending',
            }
        }
        await axios.post('http://event-bus-srv:4005/events', data)
        res.status(201).send(comments);
    });

app.post('/events', async (req, res) => {

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, status, id, content } = data;
        const comments = commentsByPostId[postId];

        console.log('commentsByPostId', commentsByPostId);


        const comment = comments.find(comment => {
            return comment.id === id;
        })
        // const comment = comments[id];
        // console.log(id)
        // console.log(comments[id])
        comment.status = status;
        const body = {
            type: 'CommentUpdated',
            data: {
                id, postId, content, status
            }
        }
        res.send({})
        await axios.post('http://event-bus-srv:4005/events', body);
    }
});

app.listen(4002, () => {
    console.log('Comment listening on port 4002...');
})