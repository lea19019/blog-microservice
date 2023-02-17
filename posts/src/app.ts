import express from 'express';
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto';
import cors from 'cors';

interface IPosts {
    [id: string]: {
        id: string,
        title: string
    }
}

const app = express();
app.use(bodyParser.json())
app.use(cors());

const posts: IPosts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = {
        id, title
    }
    
    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('LIstening on 4000')
})