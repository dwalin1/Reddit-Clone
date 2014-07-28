# == Schema Information
#
# Table name: subs
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  description  :string(255)      not null
#  moderator_id :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Sub < ActiveRecord::Base
  validates :title, :description, :moderator_id, presence: true
  
  belongs_to(
    :moderator,
    foreign_key:  :moderator_id,
    primary_key:  :id,
    class_name:   "User"
  )
  
  has_many(
    :posts,
    -> { order('upvotes DESC') },  
    foreign_key:  :sub_id,
    primary_key:  :id,
    class_name:   "Post",
    dependent: :destroy, 
  )
end
