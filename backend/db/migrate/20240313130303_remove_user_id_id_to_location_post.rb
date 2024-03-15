class RemoveUserIdIdToLocationPost < ActiveRecord::Migration[7.0]
  def change

  end

  def up
    remove_column :location_posts, :user_id
    remove_column :location_posts, :user_id_id
  end
end
