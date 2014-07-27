# == Schema Information
#
# Table name: votes
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  voteable_id   :integer          not null
#  voteable_type :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#  vote_type     :string(255)      default("up"), not null
#

class Vote < ActiveRecord::Base
  validates :user_id, :voteable_id, :voteable_type, null: false
  validates :user_id, uniqueness: { scope: :voteable_id }
  
  #I don't use counter_cache here because it can't handle votes of different types; instead, I write my own functionality for that (courtesy of http://joshsymonds.com/blog/2012/10/29/dynamic-cache-counters-in-rails/)
  
  belongs_to :voteable, polymorphic: true, touch: true
  
  after_create :increment_votes
  after_destroy :decrement_votes
  
  [:increment, :decrement].each do |type|
    define_method("#{type}_votes") do
      voteable_type.classify.constantize
      .send(
        "#{type}_counter", 
        "#{self.vote_type}votes".to_sym, 
        self.voteable_id
        )
    end
  end
end
