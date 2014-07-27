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

require 'test_helper'

class VoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
