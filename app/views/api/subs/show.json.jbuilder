json.extract!(@sub, :title, :description, :moderator_id, :id)

json.moderator @sub.moderator.username
json.moderator_id @sub.moderator.id

json.posts @sub.posts, partial: 'api/posts/basic_show', as: :post