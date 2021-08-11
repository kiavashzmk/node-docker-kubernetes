const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const app = express();
const axios = require('axios');
app.use(cors());

app.use(express.json());

let posts = {};
app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  console.log(posts);
  const data = {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  };
  await axios.post('http://event-bus-srv:4005/events', data);
  res.status(201).json({ posts: posts });
});

app.post('/events', (req, res) => {
  console.log(req.body, ' event recived');
  res.send({});
});

app.listen(4001, () => {
  console.log('V0.0.5 ');
  console.log('Post listening on port 4001...');
});
