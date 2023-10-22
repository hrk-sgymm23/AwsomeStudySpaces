class Api::V1::LocationPostsController < ApplicationController
    def index
        location_posts = LocationPost.all
        render json: location_posts, status: :ok
    end
end