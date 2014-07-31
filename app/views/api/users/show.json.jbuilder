json.extract!(@user, :username, :id)

json.subs @user.owned_subs do |sub|
  json.extract!(sub, :title, :id)
end

json.posts @posts, partial: 'api/posts/basic_show', as: :post