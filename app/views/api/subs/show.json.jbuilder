json.extract!(@sub, :title, :description, :moderator_id, :id)

json.moderator @sub.moderator.username
json.moderator_id @sub.moderator.id

json.posts @sub.posts do |post|
  json.extract!(post, :title, :url, :id, :comments_count, :upvotes)
  json.ago time_ago_in_words(post.created_at)
  json.submitter post.submitter.username
  
  if current_user
    json.votes(post.votes.where(user_id: current_user.id)) do |vote|
      json.extract!(vote, :id, :voteable_id, :vote_type)
    end
  end
end