# json.array!(@subs) do |sub|
#   json.extract!(sub, :title, :description, :moderator_id, :id)
# end

json.extract!(@sub, :title, :description, :moderator_id, :id)

json.moderator @sub.moderator.username
json.moderator_id @sub.moderator.id

json.posts @sub.posts do |post|
  json.submitter post.submitter.username
  json.submitter_id post.submitter.id
  json.extract!(post, :title, :url, :id)
end