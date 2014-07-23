# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ActiveRecord::Base.transaction do
# end

10.times do
  ActiveRecord::Base.transaction do   
    u = User.create!(
      username: Faker::Internet.user_name,
      password: "password"
    )
  
    Sub.create!(
      title: Faker::Lorem.words(3).join(" "),
      description: Faker::Lorem.sentence,
      moderator_id: u.id
    )  
  end
end

User.all.each do |user|
  Sub.all.each do |sub|
    Post.create!(
      title: Faker::Lorem.words(5).join(" "),
      url: Faker::Internet.url,
      content: Faker::Lorem.sentence,
      sub_id: sub.id,
      submitter_id: user.id
    )
  end
end



