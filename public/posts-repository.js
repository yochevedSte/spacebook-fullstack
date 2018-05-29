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
        this.posts.splice(index, 1);
    }

    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };

   
}

export default PostsRepository