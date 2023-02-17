import express from 'express';
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto';
import cors from 'cors';

interface IComment { id: string, content: string }

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

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body

    const comments: IComment[] = commentsByPost[req.params.id] || [];

    comments.push({id: commentId, content})

    commentsByPost[req.params.id] = comments;

    res.status(201).send(comments);
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})