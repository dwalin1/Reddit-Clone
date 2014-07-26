class AddUpvotes < ActiveRecord::Migration
  def change
    add_column :posts, :upvotes, :integer, default: 0
    add_column :comments, :upvotes, :integer, default: 0
    
    add_index :posts, :upvotes
    add_index :comments, :upvotes
  end
end
