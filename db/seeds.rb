# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ActiveRecord::Base.transaction do
# end


#always use rake db:reset, which will erase the db before recreating it
#if you run rake db:seed it will do this on top of what is already in the db, and it will take forever because the number of things increases exponentially

#10 users
10.times do
  ActiveRecord::Base.transaction do   
    u = User.create!(
      username: Faker::Internet.user_name,
      password: "password"
    ) 
  end
end

subs = %w("Earthporn trees funny wtf gifs photos jokes programming askreddit iama todayilearned aww eli5)

subs.each do |sub|
  Sub.create!(
    title: "r/#{sub}",
    description: Faker::Lorem.sentence(3),
    moderator_id: User.all.sample.id
  ) 
end

#20 Posts
# User.all.each do |user|
#   Sub.all.each do |sub|
#     Post.create!(
#       title: Faker::Lorem.words(5).join(" "),
#       url: Faker::Internet.url,
#       content: Faker::Lorem.sentence,
#       sub_id: sub.id,
#       submitter_id: user.id,
#     )
#   end
# end

#200 comments; all should have default of 0 upvotes
# User.all.each do |user|
#   Post.all.each do |post|
#     Comment.create!(
#       content: Faker::Lorem.sentence,
#       submitter_id: user.id,
#       post_id: post.id
#     )
#   end
# end

images = %w(http://i.imgur.com/2UH7t8z.jpg http://i.imgur.com/IAYZ20i.jpg http://i.imgur.com/T3MwFfD.jpg http://i.imgur.com/VU6qzAM.jpg http://i.imgur.com/tllKLiU.jpg http://pustovoy.35photo.ru/photos/20140519/714326.jpg http://imgur.com/V0T84Xy http://i.imgur.com/IiesWJw.jpg http://i.imgur.com/ExHKn0u.jpg http://imgur.com/01nibU3 http://i.imgur.com/Tt43eLl.jpg http://i.imgur.com/T9olOZT.jpg)
images.each do |img, i|
  Post.create!(
  title: Faker::Lorem.sentence,
  url: img,
  content: Faker::Lorem.sentence(3),
  sub_id: Sub.all.sample.id,
  submitter_id: User.all.sample.id
  )
end

User.all.each do |user|
  Post.all.each do |post|
    r = rand(10)
    next if r < 2
    v = (r < 8) ? "up" : "down"
    
    Vote.create!(
    user_id: user.id,
    voteable_id: post.id,
    voteable_type: "Post",
    vote_type: v
    )
  end
end


