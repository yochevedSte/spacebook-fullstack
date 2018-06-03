var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 3000;

mongoose.connect('mongodb://localhost/spacebookDB', { useMongoClient: true }, function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', function (req, res) {
  Post.find({}, function (err, posts) {
    res.send(posts);
  });

});
// 2) to handle adding a post
app.post('/posts', function (req, res) {
  var post = new Post({
    text: req.body.text,
    comments: []
  });

  post.save(function (err, postResult) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log(postResult);
      res.send(post);
    }
  })
});

// 3) to handle deleting a post
app.delete('/posts/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  Post.findByIdAndRemove(id, function (err, deletedPost) {
    if (err) {
      console.log("error in delete");
      throw err;
    }
    else {
      res.send(deletedPost);
    }
  });
});


app.put('/posts/:id', (req,res) => {
  var id = req.params.id;
  console.log(req.body);
  Post.findByIdAndUpdate(id, { $set: req.body}, {new:true} , (err, updatedPost)=>{
    if(err) {
      console.log(err);
    }
    else  {
      console.log("hello there");
      console.log(updatedPost);
       res.send(updatedPost);
       
    }
  });
});



// 4) to handle adding a comment to a post
app.post('/posts/:id/comments', function (req, res) {
  Post.update({ _id: req.params.id },
    { $push: { comments: req.body } },
    (err, updatedPost) => {
      if (err)
        throw err;
      else res.send(updatedPost);
    });
});

// 5) to handle deleting a comment from a post
app.delete('/posts/:postId/comments/:commentId', function (req, res) {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  Post.findById(postId, function (err, post) {
    if (err) {
      console.log("error in delete");
      throw err;
    }
    else {
      post.comments.id(commentId).remove();
      post.save(function (err, post) {
        if (err) return handleError(err);
        console.log('the subdocs were removed');
        res.send(post);
      });

    }
  });
});


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

