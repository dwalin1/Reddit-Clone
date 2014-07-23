# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  has_many(
    :owned_subs,
    foreign_key:  :moderator_id,
    primary_key:  :id,
    class_name:   "Sub"
  )
  
  has_many(
    :posts,
    foreign_key:  :submitter_id,
    primary_key:  :id,
    class_name:   "Post"
  )
  
  has_many(
    :comments,
    foreign_key:  :submitter_id,
    primary_key:  :id,
    class_name:   "Comment"
  )
  
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try { user.is_password?(password) ? user : nil }
  end
  
  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def set_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end
end
