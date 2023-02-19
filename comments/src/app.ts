import express from 'express';
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

interface IComment { id: string, content: string, [field: string]: string | number }

interface ICommentsByPost {
    [id: string]: IComment[]
}
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPost: ICommentsByPost = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPost[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body

    const comments: IComment[] = commentsByPost[req.params.id] || [];

    comments.push({id: commentId, content, status: 'pending'})

    commentsByPost[req.params.id] = comments;
     
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId, 
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPost[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })!
        comment.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        }).catch(err => console.log(err, 'cooment evenet'))
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})