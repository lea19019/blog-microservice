"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const commentsByPost = {};
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPost[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res) => {
    const commentId = (0, crypto_1.randomBytes)(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPost[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPost[req.params.id] = comments;
    res.status(201).send(comments);
});
app.listen(4001, () => {
    console.log('Listening on 4001');
});
