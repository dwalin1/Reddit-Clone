# == Schema Information
#
# Table name: comments
#
#  id                :integer          not null, primary key
#  content           :text             not null
#  submitter_id      :integer          not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime
#  updated_at        :datetime
#

class Comment < ActiveRecord::Base
  validates :content, :submitter_id, :post_id, null: false
  
  belongs_to(
    :submitter,
    foreign_key: :submitter_id,
    primary_key: :id,
    class_name:  "User"
  )
  
  belongs_to(
    :post,
    foreign_key: :post_id,
    primary_key: :id,
    class_name:  "Post",
    counter_cache: true
  )
  
  belongs_to(
    :parent_comment,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    class_name: "Comment"
  )
  
  has_many(
    :comments,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    class_name: "Comment",
    dependent: :destroy
  )
end
