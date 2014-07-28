json.extract!(@post, :title, :url, :id, :comments_count, :upvotes, :content)

json.ago time_ago_in_words(@post.created_at)
json.sub @post.sub.title
json.sub_url "#subs/#{@post.sub.id}"
json.submitter @post.submitter.username

if current_user 
  json.votes @post.votes.where(user_id: current_user.id) do |vote|
    json.extract!(vote, :id, :voteable_id, :vote_type)
  end
end

json.top_level_comments @post.comments.where(parent_comment_id: nil),
  partial: 'api/comments/show', as: :comment 

json.comments @post.comments.where.not(parent_comment_id: nil),
  partial: 'api/comments/show', as: :comment 