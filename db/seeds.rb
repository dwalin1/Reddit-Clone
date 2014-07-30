#5 users
5.times do
  ActiveRecord::Base.transaction do
    u = User.create!(
      username: Faker::Internet.user_name,
      password: "password"
    )
  end
end

#add subs
subs = %w(Earthporn trees funny wtf gifs photos jokes programming askreddit iama todayilearned aww eli5)
subs.each do |sub|
  Sub.create!(
    title: "r/#{sub}",
    description: Faker::Lorem.sentence(3),
    moderator_id: User.all.sample.id
  )
end

#posts from images
images = %w(http://i.imgur.com/3peQQYi.jpg http://i.imgur.com/z3quWLs.jpg http://i.imgur.com/SW2aAyV.jpg http://i.imgur.com/2UH7t8z.jpg http://i.imgur.com/IAYZ20i.jpg http://i.imgur.com/T3MwFfD.jpg http://i.imgur.com/VU6qzAM.jpg http://i.imgur.com/tllKLiU.jpg http://imgur.com/V0T84Xy http://i.imgur.com/IiesWJw.jpg http://i.imgur.com/ExHKn0u.jpg http://imgur.com/01nibU3 http://i.imgur.com/Tt43eLl.jpg http://i.imgur.com/T9olOZT.jpg http://i.imgur.com/J4fj8c0.jpg http://imgur.com/RO8rwcV http://i.imgur.com/T36QfAx.jpg http://i.imgur.com/i9D54EH.jpg http://imgur.com/ZmHNOGC http://i.imgur.com/3JLzS2e.jpg http://imgur.com/ri2NcWR http://i.imgur.com/1hNd3nJ.jpg http://i.imgur.com/71GeugS.jpg http://i.imgur.com/FofH8hm.jpg http://i.imgur.com/yTu1IY5.jpg http://i.imgur.com/a0awGrL.jpg http://i.imgur.com/dYVggcy.jpg http://imgur.com/de7cPpM http://i.imgur.com/5JFgaUC.jpg http://i.imgur.com/TH0Cxyn.jpg http://i.imgur.com/6ug0pfy.jpg http://imgur.com/RPeByw9 http://i.imgur.com/yDkMrjF.jpg http://i.imgur.com/lfxfr5W.jpg http://i.imgur.com/gwnvKTF.jpg http://i.imgur.com/2kRGlHt.jpg http://imgur.com/cm5IrH2 http://i.imgur.com/BQsyhJu.jpg http://i.imgur.com/hCEQEDJ.jpg http://imgur.com/60Hz04U http://i.imgur.com/9eAivVd.jpg http://i.imgur.com/Ch4pdwM.jpg http://i.imgur.com/3TKmbiB.jpg http://i.imgur.com/karxoPj.jpg http://imgur.com/llqwUwF http://i.imgur.com/qH3byI5.jpg http://i.imgur.com/icnIFpq.jpg http://imgur.com/vvr2fpj http://i.imgur.com/9nam59T.jpg http://imgur.com/f64r09Q http://imgur.com/eV8qc8d http://i.imgur.com/l6WCAvQ.jpg http://imgur.com/qvvcITg http://i.imgur.com/6DnWazj.jpg http://i.imgur.com/YyZAoyV.jpg)
images.each do |img, i|
  Post.create!(
  title: Faker::Lorem.sentence,
  url: img,
  content: Faker::Lorem.sentence(3),
  sub_id: Sub.all.sample.id,
  submitter_id: User.all.sample.id
  )
end

#vote on all posts
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

#create a large comment structure on one post
post = Post.all.sample

#5 top level posts
users = User.all.shuffle
users.each do |user|
  Comment.create!(
  content: Faker::Lorem.sentence,
  submitter_id: user.id,
  post_id: post.id,
  parent_comment_id: nil
  )
end

# 1: 5 * 5 = 25 comments
1.times do
  users = User.all.shuffle
  comments = post.comments.clone

  users.each do |user|
    comments.each do |comment|
      Comment.create!(
      content: Faker::Lorem.sentence,
      submitter_id: user.id,
      post_id: post.id,
      parent_comment_id: comment.id
      )
    end
  end
end