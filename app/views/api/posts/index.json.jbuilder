json.array! @posts do |post|
  json.extract!(post, :title, :url, :upvotes)
  json.submitter post.submitter.username
  json.sub post.sub.title
end