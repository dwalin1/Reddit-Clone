#20 users
20.times do
  ActiveRecord::Base.transaction do
    u = User.create!(
      username: Faker::Internet.user_name,
      password: "password"
    )
  end
end

#add subs
subs = %w(gifs aww Earthporn funny wtf food mildlyinteresting)
descriptions = [
  "Moving pictures!",
  "So cute! Awwww",
  "Mother Nature is a MILF.",
  "Things which are not especially funny.",
  "Things which are not especially wtf.",
  "Tastiness",
  "Things which are mildly interesting"
]

subs.each_with_index do |sub, i|
  Sub.create!(
    title: "r/#{sub}",
    description: descriptions[i],
    moderator_id: User.all.sample.id
  )
end

#create giant hash to iterate over for posts
image_hashes = {
  gifs: [
    {
      title: "Dog to the rescue",
      url: "http://i.imgur.com/iAaGhgL.gif",
      content: "Dog runs on sheep: coolness ensues."
    },
  
    {
      title: "This dog knows the muffin man",
      url: "http://i.imgur.com/xmhzkbg.gif",
      content: "He lives on Drury Lane."
    },
  
    {
      title: "You made this?",
      url: "http://i.imgur.com/Beknpzx.gif",
      content: "I made this."
    },
    
    {
      title: "Because physics",
      url: "http://i.imgur.com/karLW5E.gif",
      content: "Right in the forehead"
    },
    
    {
      title: "Tastes like burning!",
      url: "http://i.imgur.com/crgL3xX.gif",
      content: "Me fail English? That's unpossible!"
    },
    
    {
      title: "I'm grooming here!",
      url: "http://i.imgur.com/pPgT7pT.gif",
      content: "Can a ferret get no privacy?"
    }
  ],
  
  aww: [
    {
      title: "Ppppfftt",
      url: "http://i.imgur.com/z3quWLs.jpg", 
      content: "Kids these days."
    },
  
    {
      title: "These feet are made for grabbing",
      url: "http://i.imgur.com/IAYZ20i.jpg",
      content: "And that's just what I'll do"
    },
  
    {
      title: "Kitty love",
      url: "http://i.imgur.com/dE7wOpY.jpg",
      content: "Awwwwww"
    },
    
    {
      title: "Beagle hug",
      url: "http://i.imgur.com/T36QfAx.jpg",
      content: "So sweet"
    },
    
    {
      title: "Cute lil fella",
      url: "http://imgur.com/ZmHNOGC",
      content: "Who's a good boy?"
    },
    
    {
      title: "He can hog my hedge any day",
      url: "http://i.imgur.com/1hNd3nJ.jpg",
      content: "Dawwww"
    },
    
    {
      title: "Say what?",
      url: "http://i.imgur.com/yTu1IY5.jpg",
      content: "This cat looks surprised"
    },
    
    {
      title: "Onward, faithful steed",
      url: "http://i.imgur.com/a0awGrL.jpg"
    },
    
    {
      title: "Only Thor and Dog-Thor can pick it up",
      url: "http://i.imgur.com/lfxfr5W.jpg"
    },
    
    {
      title: "A puppy!",
      url: "http://i.imgur.com/hCEQEDJ.jpg"
    },
    
    {
      title: "Such a pretty kitty",
      url: "http://imgur.com/60Hz04U"
    },
    
    {
      title: "Dinner time!",
      url: "http://imgur.com/llqwUwF"
    },
    
    {
      title: "Baby lion",
      url: "http://i.imgur.com/icnIFpq.jpg",
      content: "Awimbaway awimbaway awimbaway..."
    },
    
    {
      title: "Hello there!",
      url: "http://i.imgur.com/l6WCAvQ.jpg",
      
    },
    
    {
      title: "An afternoon at sea",
      url: "http://i.imgur.com/YyZAoyV.jpg",
      content: "He likes to bark on barques"
    },
    
    {
      title: "They'll cap your bara",
      url: "http://i.imgur.com/WDAnBNl.jpg",
      content: "It's a clever pun on the word capybara"
    },
    
    {
      title: "Oh deer",
      url: "http://i.imgur.com/waEwoLk.jpg"
    }
  ],
   
  Earthporn: [
    {
      title: "The night sky",
      url: "http://i.imgur.com/tllKLiU.jpg",
      content: "Beautiful"
    },
    
    {
      title: "I come from the land of the ice and snow...",
      url: "http://i.imgur.com/3peQQYi.jpg",
      content: "Hammer of the gods..."
    },
    
    {
      title: "Damn! That's some fine Earthporn.",
      url: "http://i.imgur.com/IiesWJw.jpg",
      content: "Ayup."
    },
    
    {
      title: "A lake or something",
      url: "http://i.imgur.com/T9olOZT.jpg",
      content: "Possibly a river."
    },
    
    {
      title: "It was nighttime when this photo was taken",
      url: "http://i.imgur.com/J4fj8c0.jpg",
      content: "True story."
    },
    
    {
      title: "Town in Colorado",
      url: "http://i.imgur.com/yDkMrjF.jpg",
      content: "Not sure if it is actually in Colorado, but that seems plausible"
    },
    
    {
      title: "Awesome lake",
      url: "http://i.imgur.com/9eAivVd.jpg",
      content: "This is what happens when water fills a hole"
    },
    
    {
      title: "Coastal bliss",
      url: "http://i.imgur.com/3TKmbiB.jpg",
      content: "Flowers too"
    }
  ],
  
  funny: [
    {
     title: "My child bought an anteater",
     url: "http://i.imgur.com/SW2aAyV.jpg",
     content: "Now I have no sister."
    },
    
    {
      title: "His dad is Walter White",
      url: "http://imgur.com/ri2NcWR",
      content: "Seriously, he looks like Walter White"
    },
    
    {
      title: "Genius indeed",
      url: "http://imgur.com/aw4QLJu",
      content: "It's always sunny when you have rum-soaked ham"
    },
    
    {
      title: "Would that we all could be non-bogus babes",
      url: "http://i.imgur.com/siUb43f.jpg",
      content: "Imagine all the people...being non-bogus babes"
    },
    
    {
      title: "A true hide and seek champion",
      url: "http://i.imgur.com/4JpWRnl.jpg",
      content: "No one will ever find him there"
    },
    
    {
      title: "Fido the Burninator",
      url: "http://i.imgur.com/su6yFvy.jpg",
      content: "And the Fido burns in the niiiiiight..."
    },
    
    {
      title: "I am not amused.",
      url: "http://i.imgur.com/VwHDvRW.jpg",
      content: "Bath time is not laugh time."
    },
    
    {
      title: "Let's go beyond herds, flocks, packs, murders, and prides",
      url: "http://i.imgur.com/QWJp9Fy.jpg",
    }
  ],
  
  wtf: [
    {
      title: "FEED ME",
      url: "http://i.imgur.com/Tt43eLl.jpg",
      content: "I AM A HUNGRY MONKEY"
    },
    
    {
      title: "Lovecraft does Sponge Bob",
      url: "http://i.imgur.com/i9D54EH.jpg",
      content: "He found a gateway to our dimension"
    },
    
    {
      title: "Stampy wants a peanut",
      url: "http://i.imgur.com/FofH8hm.jpg",
      content: "Money can be exchanged for goods and services"
    },
    
    {
      title: "My preciousssssssss",
      url: "http://i.imgur.com/TH0Cxyn.jpg",
      content: "Preciousssss, preciousss feets"
    },
    
    {
      title: "Banana fail",
      url: "http://imgur.com/f64r09Q",
      content: "Gravity got to them in the end"
    },
    
    {
      title: "All hail hypnocat",
      url: "http://imgur.com/qvvcITg",
      content: "He is our new overlord"
    },
    
    {
      title: "Human face without muscles",
      url: "http://i.imgur.com/4hlSio8.jpg",
      content: "What the face?"
    }
  ],
  
  mildlyinteresting: [
    {
      title: "Made a tiny sword from a nail",
      url: "http://i.imgur.com/3JLzS2e.jpg",
      content: "Cool!"
    },
    
    {
      title: "Look at these costumes",
      url: "http://i.imgur.com/71GeugS.jpg",
      content: "They are from a movie"
    },
    
    {
      title: "This corn has a penis",
      url: "http://i.imgur.com/karxoPj.jpg",
      content: "It's a-maize-ing"
    },
    
    {
      title: "Grass growing through an aloe plant",
      url: "http://i.imgur.com/n82DHgU.jpg",
      content: "That's some sharp, firm grass"
    },
    
    {
      title: "Vertically layered cake",
      url: "http://i.imgur.com/EIqquUy.jpg",
      content: "Cool."
    },
    
    {
      title: "Dropped pasta, art ensued",
      url: "http://imgur.com/1UqDAOD",
      content: "Watch out, Picasso"
    },
    
    {
      title: "NES built into an NES cartridge",
      url: "http://i.imgur.com/rWjyxmU.jpg"
    }
  ],
  
  food: [
    {
      title: "BACON",
      url: "http://imgur.com/cm5IrH2",
      content: "Wrapping some other thing that isn't bacon"
    },
    
    {
      title: "Fancy cooking",
      url: "http://i.imgur.com/BQsyhJu.jpg",
      content: "The rainy outdoor BBQ is all the rage"
    },
    
    {
      title: "Pizza!",
      url: "http://i.imgur.com/Ch4pdwM.jpg",
      content: "When it's on a bagel, you can have pizza any time"
    },
    
    {
      title: "This looks amazing",
      url: "http://imgur.com/vvr2fpj",
      content: "I am eating it with my mind"
    },
    
    {
      title: "Deep dish cast iron skillet pizza",
      url: "http://imgur.com/eV8qc8d",
      content: "Dig in!"
    },
    
    {
      title: "Raspberry muffins",
      url: "http://i.imgur.com/6DnWazj.jpg",
      content: "Carefully baked one at a time to perfection, like app features"
    }
  ]
}

#create posts from image_hashes
Sub.all.each do |sub|
  id = sub.id
  title = sub.title[2..-1].to_sym
  image_hashes[title].each do |hash|
    hash[:sub_id] = id
    hash[:submitter_id] = User.all.sample.id
    Post.create!(hash)
  end
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

#create some comments on all posts
Post.all.each do |post|
  3.times do
    c = Comment.create!(
    content: Faker::Hacker.say_something_smart,
    submitter_id: User.all.sample.id,
    post_id: post.id,
    parent_comment_id: nil
    )
    
    r = rand(10)
    
    if r <= 5
      r.times do
        r2 = rand(10)
        content = (r2 < 4) ? Faker::Hacker.verb : Faker::Hacker.say_something_smart
        
        c = Comment.create!(
        content: content,
        submitter_id: User.all.sample.id,
        post_id: post.id,
        parent_comment_id: c.id
        )
        
        if (r2 < 3)
          c2 = c
          r2.times do 
            c2 = Comment.create!(
            content: Faker::Hacker.noun,
            submitter_id: User.all.sample.id,
            post_id: post.id,
            parent_comment_id: c2.id
            )
          end
        end
      end
    end
  end
end

#vote on comments
User.all.each do |user|
  Comment.all.each do |comment|
    r = rand(10)
    next if r < 5
    v = (r < 8) ? "up" : "down"

    Vote.create!(
    user_id: user.id,
    voteable_id: comment.id,
    voteable_type: "Comment",
    vote_type: v
    )
  end
end