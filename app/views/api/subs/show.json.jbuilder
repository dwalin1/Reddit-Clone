# json.array!(@subs) do |sub|
#   json.extract!(sub, :title, :description, :moderator_id, :id)
# end

json.extract!(@sub, :title, :description, :moderator_id, :id)

json.posts @sub.posts