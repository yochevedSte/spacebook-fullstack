var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 3000;

mongoose.connect('mongodb://localhost/spacebookDB', {useMongoClient: true}, function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/posts', function (req, res) {
  Post.find({},function(err, posts){
    res.send(posts);
  });
  
})

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});


//Creating posts
/* var post = new Post({text:"post text 2", comments:[{text:"comment 2", user:"Akiva"}]});
post.save(function(err, posts){
    if(err) console.log(err);
    else console.log("success" + posts);
});

post = new Post({text:"post text 3", comments:[{text:"comment 3", user:"Eitan"}]});
post.save(function(err, posts){
    if(err) console.log(err);
    else console.log("success" + post);
});

post = new Post({text:"post text 4", comments:[{text:"comment 4", user:"Yishai"}]});
post.save(function(err, posts){
    if(err) console.log(err);
    else console.log("success" + post);
});

post = new Post({text:"post text 5", comments:[{text:"comment 5", user:"Shana"}]});
post.save(function(err, posts){
    if(err) console.log(err);
    else console.log("success" + post);
});
 */

