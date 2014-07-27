class RemoveDownVotes < ActiveRecord::Migration
  def change
    remove_column :posts, :downvotes
    remove_column :comments, :downvotes
  end
end
