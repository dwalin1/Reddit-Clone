json.extract!(@comment, :content, :id, :submitter_id, :parent_comment_id, :post_id)
json.submitter @comment.submitter.username

json.comments @comment.comments do |comment|
  json.extract!(comment, :id, :content, :submitter_id, :post_id, :parent_comment_id)
  json.submitter comment.submitter.username
end