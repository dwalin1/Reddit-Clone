json.extract!(@post, :title, :url, :content)

json.submitter @post.submitter.username
json.submitter_id @post.submitter.id

json.comments @post.comments do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id)
end