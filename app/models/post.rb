# == Schema Information
#
# Table name: posts
#
#  id             :integer          not null, primary key
#  title          :string(255)      not null
#  url            :string(255)
#  content        :text
#  sub_id         :integer          not null
#  submitter_id   :integer          not null
#  created_at     :datetime
#  updated_at     :datetime
#  upvotes        :integer          default(0)
#  comments_count :integer          default(0), not null
#

class Post < ActiveRecord::Base
  validates :title, :sub_id, :submitter_id, presence: true
  
  belongs_to(
    :sub,
    foreign_key:  :sub_id,
    primary_key:  :id,
    class_name:   "Sub"
  )
  
  belongs_to(
    :submitter,
    foreign_key:  :submitter_id,
    primary_key:  :id,
    class_name:   "User"
  )
  
  has_many(
    :comments,
    -> { order('upvotes DESC') },
    foreign_key:  :post_id,
    primary_key:  :id,
    class_name:   "Comment",
    dependent: :destroy
  )
  
  has_many(
    :votes,
    dependent: :destroy,
    as: :voteable
  )
end
