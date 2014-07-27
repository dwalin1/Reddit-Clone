class AddColumns < ActiveRecord::Migration
  def change
    add_column :votes, :type, :string, null: false, default: "up"
    add_column :posts, :downvotes, :integer, null: false, default: 0
    add_column :comments, :downvotes, :integer, null: false, default: 0
  end
end
