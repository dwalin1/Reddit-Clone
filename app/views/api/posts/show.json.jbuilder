json.extract!(@post, :title, :url, :id, :comments_count, :upvotes)

json.ago time_ago_in_words(@post.created_at)
json.sub @post.sub.title
json.sub_url "#subs/#{@post.sub.id}"
json.submitter @post.submitter.username

if current_user 
  json.votes @post.votes.where(user_id: current_user.id) do |vote|
    json.extract!(vote, :id, :voteable_id, :vote_type)
  end
end

json.top_level_comments @post.comments.where(parent_comment_id: nil).each do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id, :post_id, :parent_comment_id, :created_at)
end

json.comments @post.comments.where.not(parent_comment_id: nil) do |comment|
  json.submitter comment.submitter.username
  json.submitter_id comment.submitter.id
  json.extract!(comment, :content, :id, :post_id, :parent_comment_id, :created_at)
end