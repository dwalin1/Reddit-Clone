json.extract!(@sub, :title, :description, :moderator_id, :id)

json.moderator @sub.moderator.username
json.moderator_id @sub.moderator.id
json.page @page
json.total_pages @total_pages

json.posts @sub_posts, partial: 'api/posts/basic_show', as: :post