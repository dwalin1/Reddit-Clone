json.extract!(@post, :title, :content, :sub_id)

json.submitter @post.submitter.username
json.submitter_id @post.submitter.id

if @post.url == ""
  json.url "#posts/#{@post.id}"
else
  json.url @post.url
end

json.top_level_comments @post.comments.where(parent_comment_id: nil).each do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id, :post_id, :parent_comment_id)
end

json.comments @post.comments.where.not(parent_comment_id: nil) do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id, :post_id, :parent_comment_id)
end