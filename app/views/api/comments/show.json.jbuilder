json.extract!(@comment, :content, :id, :submitter_id, :parent_comment_id, :post_id)

json.comments @comment.comments do |comment|
  json.id comment.id
end