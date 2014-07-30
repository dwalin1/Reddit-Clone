json.partial! 'api/posts/basic_show', post: @post

json.content @post.content

json.top_level_comments @top_level_comments,
  partial: 'api/comments/show', as: :comment 

json.comments @comments,
  partial: 'api/comments/show', as: :comment 