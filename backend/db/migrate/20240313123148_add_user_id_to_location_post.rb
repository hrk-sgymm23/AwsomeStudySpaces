class AddUserIdToLocationPost < ActiveRecord::Migration[7.0]
  def change
    # add_column :location_posts, :user_id, :integer
    add_reference :location_posts, :user, foreign_key: true
  end
end
