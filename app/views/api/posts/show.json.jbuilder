json.partial! 'api/posts/basic_show', post: @post

json.content @post.content

json.top_level_comments @post.comments.where(parent_comment_id: nil),
  partial: 'api/comments/show', as: :comment 

json.comments @post.comments.where.not(parent_comment_id: nil),
  partial: 'api/comments/show', as: :comment 