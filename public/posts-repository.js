/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postText) {
        return $.ajax({
            method: "POST",
            url: '/posts',
            data: { text: postText },
            dataType: "json",
            success: (newPost) =>{
                this.posts.push(newPost);
                console.log(this.posts);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                throw textStatus;
            }
        });
        
    }

    removePost(index) {
        console.log("entered removePOst");
        return $.ajax({
            method: "DELETE",
            url: '/posts/' + this.posts[index]._id,
            success: () =>{
                console.log("entered success");
                this.posts.splice(index, 1);
                console.log("succeeded to delete post");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ajax error");
                console.log(textStatus);
            }
        });
        
    }

    addComment(newComment, postIndex) {
        let post = this.posts[postIndex];
        let postId = post._id;
        return $.ajax({
            method: "POST",
            url: '/posts/' + post._id + '/comments',
            data: newComment,
            dataType: "json",
            success: (updatedPost) =>{
                this.posts[postIndex].comments.push(newComment);
                console.log(updatedPost);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

    deleteComment(postIndex, commentIndex) {
        let post = this.posts[postIndex];
        return $.ajax({
            method: "DELETE",
            url: '/posts/' + post._id + '/comments/'  + post.comments[commentIndex]._id ,
            success: () =>{
                console.log("entered success");
                this.posts[postIndex].comments.splice(commentIndex, 1);
                console.log("succeeded to delete comment");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ajax error");
                console.log(textStatus);
            }
        });
    };

    loadPostsFromDB(){
       return $.ajax({
            method: "GET",
            url: '/posts',
            success:(postsResult) => {
                console.log(postsResult);
                for(var post of postsResult){  
                   this.posts.push({_id:post._id, text: post.text, comments: post.comments});
                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
       }
}

export default PostsRepository