/* eslint-disable */

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const USER_ERROR_OBJECT = { error: "422: Unprocessable Entity"}

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ title: 'First post', content: "I like turtles" }, { title: 'Doge 1', content: "MacGruber" }];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get("/", (req, res) => {
    res.send("testeroo!");
})

server.get("/posts", (req, res) => {
    let term = req.query.term.toLowerCase();

    if (!term) {
        res.json(posts);
        res.end();
    }

    posts.forEach(post => {
        let title = post.title.toLowerCase().split(" ");
        let content = post.content.toLowerCase().split(" ");
        if (title.indexOf(term) > -1 || content.indexOf(term) > -1){
            console.log("Result found!")
            res.json(post);
            res.end();
        }; 
    })

    console.log("No result found");
    res.status(STATUS_USER_ERROR);
    res.send("No matching term was found!");
})

server.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.content){
        res.status(STATUS_USER_ERROR);
        res.json(USER_ERROR_OBJECT);
        res.end();
    }

    //generate ID
    const newPost = {
        title: req.body.title,
        content: req.body.content
    }

    //send ID
    res.json(newPost);
})


module.exports = { posts, server };