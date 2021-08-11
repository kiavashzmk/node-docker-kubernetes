const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const posts = {};
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    return;
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    console.log(data);
    const post = posts[postId];
    post.comments.push({ id, content, status });
    return;
  }

  if (type === 'CommnetUpdate') {
    console.log(type, data);
    return;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(type, data); 
  handleEvent(type, data);

  console.log(posts);
  res.send({});
});

app.listen(4003, async () => {
  console.log('Query listening on port 4003...');
  const res = await axios.get('http://event-bus-srv:4005/events');
  for (let event of res.data) {
    console.log('Processing event: ', event.type);
    handleEvent(event.type, event.data);
  }
});
