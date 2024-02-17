class AddAddressToLocationPost < ActiveRecord::Migration[7.0]
  def change
    add_column :location_posts, :address, :string
  end
end
