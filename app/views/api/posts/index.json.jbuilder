json.array! @posts do |post|
  json.extract!(post, :title, :url, :upvotes)
  json.ago time_ago_in_words(post.created_at)
  json.submitter post.submitter.username
  json.sub post.sub.title
  json.sub_url "#subs/#{post.sub.id}"
end