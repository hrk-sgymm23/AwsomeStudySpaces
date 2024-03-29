class LocationPost < ApplicationRecord
    validates :title, presence: true
    belongs_to :user
    has_many_attached :location_image

    def index_location_images
        
    end

    def show_location_image
        return location_image.first if location_image.attached? && location_image.count == 1
    end
end
