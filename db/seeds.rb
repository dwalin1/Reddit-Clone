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

Sub.create!(
  title: Faker::Lorem.words(3).join(" "),
  description: Faker::Lorem.sentence,
  moderator_id: User.first.id
) 

Sub.create!(
  title: Faker::Lorem.words(3).join(" "),
  description: Faker::Lorem.sentence,
  moderator_id: User.last.id
) 

#20 Posts
User.all.each do |user|
  Sub.all.each do |sub|
    Post.create!(
      title: Faker::Lorem.words(5).join(" "),
      url: Faker::Internet.url,
      content: Faker::Lorem.sentence,
      sub_id: sub.id,
      submitter_id: user.id,
      upvotes: rand(5000)
    )
  end
end

#200 comments; all should have default of 0 upvotes
User.all.each do |user|
  Post.all.each do |post|
    Comment.create!(
      content: Faker::Lorem.sentence,
      submitter_id: user.id,
      post_id: post.id
    )
  end
end



