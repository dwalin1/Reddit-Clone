json.array!(@subs) do |sub|
  json.extract!(sub, :title, :description, :moderator_id, :id)
end