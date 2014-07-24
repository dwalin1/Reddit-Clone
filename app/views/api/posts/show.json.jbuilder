json.extract!(@post, :title, :content, :sub_id)

json.submitter @post.submitter.username
json.submitter_id @post.submitter.id

if @post.url == ""
  json.url "#posts/#{@post.id}"
else
  json.url @post.url
end
  

if @current_user
  json.user_id @current_user.id
else
  json.user_id nil
end

json.comments @post.comments do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id)
end