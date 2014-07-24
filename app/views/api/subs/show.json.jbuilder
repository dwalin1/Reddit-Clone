# json.array!(@subs) do |sub|
#   json.extract!(sub, :title, :description, :moderator_id, :id)
# end

json.extract!(@sub, :title, :description, :moderator_id, :id)

json.moderator @sub.moderator.username
json.moderator_id @sub.moderator.id

if @current_user
  json.user_id @current_user.id
else
  json.user_id nil
end

json.posts @sub.posts do |post|
  json.submitter post.submitter.username
  json.submitter_id post.submitter.id
  json.extract!(post, :title, :id)
  
  if post.url == ""
    json.url "#posts/#{post.id}"
  else
    json.url post.url
  end
end