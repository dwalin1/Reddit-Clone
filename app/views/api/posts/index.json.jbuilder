json.array! @posts do |post|
  json.extract!(post, :title, :url, :id, :comments_count, :upvotes)
  json.ago time_ago_in_words(post.created_at)
  json.submitter post.submitter.username
  json.sub post.sub.title
  json.sub_url "#subs/#{post.sub.id}" 
  json.votes(post.votes.where(user_id: current_user.id)) do |vote|
    json.extract!(vote, :id, :voteable_id, :vote_type)
  end
end