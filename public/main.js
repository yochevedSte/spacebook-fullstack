import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();

let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();


//-----Load  all the posts from database when page is loaded--------//

var loadPostsFromDB = function(){
 $.ajax({
     method: "GET",
     url: '/posts',
     success: function (data) {
         console.log(data);
         for(var post of data){  
            postsRepository.posts.push({_id:post._id, text: post.text, comments: post.comments});
         }
        postsRenderer.renderPosts(postsRepository.posts);
     },
     error: function (jqXHR, textStatus, errorThrown) {
         console.log(textStatus);
     }
 });
}

loadPostsFromDB();