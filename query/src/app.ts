import express from 'express';
import bodyParser from 'body-parser'
import axios from 'axios'
import cors from 'cors';

interface IComment {
    id: string,
    content: string
    [field:string]: string | number
}

interface IPosts {
    [id: string]: {
        id: string,
        title: string,
        comments: IComment[]
    }
}

const posts: IPosts = {}

const handleEvent = (type: string, data: any) => {

    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }

    else if (type == 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        post.comments.push({id, content, status})
    }

    else if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data
        
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id })!

        comment.status = status
        comment.content = content
    }
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body

    handleEvent(type, data)

    console.log(posts)

    res.send({})
})

app.listen(4002, async () => {
    console.log('Listening on 4002')

    try {
        const res = await axios.get("http://localhost:4005/events");
     
        for (let event of res.data) {
          console.log("Processing event:", event.type);
     
          handleEvent(event.type, event.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }

})