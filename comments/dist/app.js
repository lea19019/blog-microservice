"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const commentsByPost = {};
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPost[req.params.id] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = (0, crypto_1.randomBytes)(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPost[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPost[req.params.id] = comments;
    await axios_1.default.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send(comments);
});
app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPost[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        await axios_1.default.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        }).catch(err => console.log(err, 'cooment evenet'));
    }
    res.send({});
});
app.listen(4001, () => {
    console.log('Listening on 4001');
});
