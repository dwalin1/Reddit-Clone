json.submitter comment.submitter.username
json.submitter_id comment.submitter.id
json.extract!(comment, :content, :id, :post_id, :parent_comment_id, :upvotes)
json.ago time_ago_in_words(comment.created_at)

if current_user 
  json.votes comment.votes.where(user_id: current_user.id) do |vote|
    json.extract!(vote, :id, :voteable_id, :vote_type)
  end
end