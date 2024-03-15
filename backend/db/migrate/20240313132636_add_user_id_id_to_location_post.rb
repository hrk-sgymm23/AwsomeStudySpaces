class AddUserIdIdToLocationPost < ActiveRecord::Migration[7.0]
  def change
    add_reference :location_posts, :user, foreign_key: true
  end
end
