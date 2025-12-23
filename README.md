# blogsphere_task_server

process:  

signup->login(email and password)->copy token ->postPost in authorizaton click headers and bearer <pastetoken> and in body enter the content and title



post apis:
for posting post ->postPost
for getting all post->getPost
for getting single post->getPost/:postId
for updating post ->updatePost/:postId
for deleting post ->deletePost/:postId


comments api:
for posting comment copy the authorid in blogs (which is the postid on which post we can comment) /postComment (same like the paste token in headers and in body {postid :....and text:....})
for getting /getComment
